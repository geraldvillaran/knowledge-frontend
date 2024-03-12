import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTheme } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Step, StepContent, StepLabel } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseLoading from '@fuse/core/FuseLoading';
import SumdocInfo from '../SumdocInfo';
import SumdocProgress from '../SumdocProgress';
import Error404Page from '../../../404/Error404Page';
import { useGetSummarizedDocQuery, useUpdateSummarizedDocMutation } from '../SummarizerApi';

/**
 * The Sumdoc page.
 */
function Sumdoc() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const theme = useTheme();
	const pageLayout = useRef(null);
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const routeParams = useParams();
	const { sumdocId } = routeParams;
	const { data: sumdoc, isLoading } = useGetSummarizedDocQuery(
		{ sumdocId },
		{
			skip: !sumdocId
		}
	);
	const [updateSumdoc] = useUpdateSummarizedDocMutation();

	useEffect(() => {
		/**
		 * If the sumdoc is opened for the first time
		 * Change ActiveStep to 1
		 */
		if (sumdoc && sumdoc?.progress?.currentStep === 0) {
			updateSumdoc({ sumdocId, data: { progress: { currentStep: 1 } } });
		}
	}, [sumdoc]);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
	}, [isMobile]);

	const currentStep = sumdoc?.progress?.currentStep || 0;

	function updateCurrentStep(index: number) {
		if (sumdoc && (index > sumdoc.totalSteps || index < 0)) {
			return;
		}

		updateSumdoc({ sumdocId, data: { progress: { currentStep: index } } });
	}

	function handleNext() {
		updateCurrentStep(currentStep + 1);
	}

	function handleBack() {
		updateCurrentStep(currentStep - 1);
	}

	function handleStepChange(index: number) {
		updateCurrentStep(index + 1);
	}

	const activeStep = currentStep !== 0 ? currentStep : 1;

	if (isLoading) {
		return <FuseLoading />;
	}

	if (!sumdoc) {
		return <Error404Page />;
	}

	return (
		<FusePageSimple
			content={
				<div className="w-full">
					<Hidden lgDown>
						<SumdocProgress
							className="sticky top-0 z-10"
							sumdoc={sumdoc}
						/>
					</Hidden>

					<Hidden lgUp>
						<Paper
							className="flex sticky top-0 z-10 items-center w-full px-16 py-8 border-b-1 shadow-0"
							square
						>
							<IconButton
								to="/apps/academy/sumdocs"
								component={Link}
							>
								<FuseSvgIcon>
									{theme.direction === 'ltr'
										? 'heroicons-outline:arrow-sm-left'
										: 'heroicons-outline:arrow-sm-right'}
								</FuseSvgIcon>
							</IconButton>

							<Typography className="text-13 font-medium tracking-tight mx-10">{sumdoc.title}</Typography>
						</Paper>
					</Hidden>

					<SwipeableViews
						index={activeStep - 1}
						enableMouseEvents
						onChangeIndex={handleStepChange}
					>
						{sumdoc.steps.map((step: { content: string }, index: number) => (
							<div
								className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64"
								key={index}
							>
								<Paper className="w-full max-w-lg mx-auto sm:my-8 lg:mt-16 p-24 sm:p-40 sm:py-48 rounded-16 shadow overflow-hidden">
									<div
										className="prose prose-sm dark:prose-invert w-full max-w-full"
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={{ __html: step.content }}
										dir={theme.direction}
									/>
								</Paper>
							</div>
						))}
					</SwipeableViews>

					<Hidden lgDown>
						<div className="flex justify-center w-full sticky bottom-0 p-16 pb-32 z-10">
							<ButtonGroup
								variant="contained"
								aria-label=""
								className="rounded-full"
								color="secondary"
							>
								<Button
									className="min-h-56 rounded-full"
									size="large"
									startIcon={<FuseSvgIcon>heroicons-outline:arrow-narrow-left</FuseSvgIcon>}
									onClick={handleBack}
								>
									Prev
								</Button>
								<Button
									className="pointer-events-none min-h-56"
									size="large"
								>{`${activeStep}/${sumdoc.totalSteps}`}</Button>
								<Button
									className="min-h-56 rounded-full"
									size="large"
									endIcon={<FuseSvgIcon>heroicons-outline:arrow-narrow-right</FuseSvgIcon>}
									onClick={handleNext}
								>
									Next
								</Button>
							</ButtonGroup>
						</div>
					</Hidden>

					<Hidden lgUp>
						<Box
							sx={{ backgroundColor: 'background.paper' }}
							className="flex sticky bottom-0 z-10 items-center w-full p-16 border-t-1"
						>
							<IconButton
								onClick={() => setLeftSidebarOpen(true)}
								aria-label="open left sidebar"
								size="large"
							>
								<FuseSvgIcon>heroicons-outline:view-list</FuseSvgIcon>
							</IconButton>

							<Typography className="mx-8">{`${activeStep}/${sumdoc.totalSteps}`}</Typography>

							<SumdocProgress
								className="flex flex-1 mx-8"
								sumdoc={sumdoc}
							/>

							<IconButton onClick={handleBack}>
								<FuseSvgIcon>heroicons-outline:arrow-narrow-left</FuseSvgIcon>
							</IconButton>

							<IconButton onClick={handleNext}>
								<FuseSvgIcon>heroicons-outline:arrow-narrow-right</FuseSvgIcon>
							</IconButton>
						</Box>
					</Hidden>
				</div>
			}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			leftSidebarWidth={300}
			leftSidebarContent={
				<>
					<div className="p-32">
						<Button
							to="/apps/academy/sumdocs"
							component={Link}
							className="mb-24"
							color="secondary"
							variant="text"
							startIcon={
								<FuseSvgIcon size={20}>
									{theme.direction === 'ltr'
										? 'heroicons-outline:arrow-sm-left'
										: 'heroicons-outline:arrow-sm-right'}
								</FuseSvgIcon>
							}
						>
							Back to sumdocs
						</Button>

						<SumdocInfo sumdoc={sumdoc} />
					</div>
					<Divider />
					<Stepper
						classes={{ root: 'p-32' }}
						activeStep={activeStep - 1}
						orientation="vertical"
					>
						{sumdoc.steps.map((step, index) => {
							return (
								<Step
									key={index}
									sx={{
										'& .MuiStepLabel-root, & .MuiStepContent-root': {
											cursor: 'pointer!important'
										},
										'& .MuiStepContent-root': {
											color: 'text.secondary',
											fontSize: 13
										}
									}}
									onClick={() => handleStepChange(step.order)}
									expanded
								>
									<StepLabel
										className="font-medium"
										sx={{
											'& .MuiSvgIcon-root': {
												color: 'background.default',
												'& .MuiStepIcon-text': {
													fill: (_theme) => _theme.palette.text.secondary
												},
												'&.Mui-completed': {
													color: 'secondary.main',
													'& .MuiStepIcon-text ': {
														fill: (_theme) => _theme.palette.secondary.contrastText
													}
												},
												'&.Mui-active': {
													color: 'secondary.main',
													'& .MuiStepIcon-text ': {
														fill: (_theme) => _theme.palette.secondary.contrastText
													}
												}
											}
										}}
									>
										{step.title}
									</StepLabel>
									<StepContent>{step.subtitle}</StepContent>
								</Step>
							);
						})}
					</Stepper>
				</>
			}
			scroll="content"
			ref={pageLayout}
		/>
	);
}

export default Sumdoc;
