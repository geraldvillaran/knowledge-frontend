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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArticleIcon from '@mui/icons-material/Article';
import ListItemText from '@mui/material/ListItemText';
import SummarizeIcon from '@mui/icons-material/Summarize';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { useGetSummarizedDocQuery, useUpdateSummarizedDocMutation } from '../SummarizerApi';
import BasicTabs, { BasicTabsProps } from '../sumdoc/SumdocTabs';
import SummaryCard from './SummaryCard';
import SumdocEvalChart from './SumdocEvalChart';
/**
 * The Sumdoc page.
 */

const drawerWidth = 240;
const icons = [<ArticleIcon />, <SummarizeIcon />, <StackedLineChartIcon />];

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

	const [activeTab, setActiveTab] = useState(0);
	const tabContents = [
		/* Content for 'Document' */
		<>hello</>,
		/* Content for 'Summaries' */
		<>
			<div style={{ display: 'flex' }}>
				<div style={{ flex: 1, marginRight: '10px' }}>
					<SummaryCard />

				</div>
				<div style={{ flex: 1 }}>
					<SummaryCard />
				</div>
			</div>
			<Divider />
			<h3>Evaluation</h3>
			<div style={{ display: "flex", width: "100%" }}>
				<SumdocEvalChart />
			</div>
		</>
	];

	const handleTabChange = (index: number) => {
		setActiveTab(index);
	};


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

		// updateSumdoc({ sumdocId, data: { progress: { currentStep: index } } });
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
								to="/apps/summarizer/sumdocs"
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
					<div
						className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64"
					>
						<Paper className="w-full max-w-xl mx-auto sm:my-8 lg:mt-16 p-24 sm:p-40 sm:py-48 rounded-16 shadow overflow-hidden">
							<div
								className="prose prose-sm dark:prose-invert w-full max-w-full"
								// eslint-disable-next-line react/no-danger
								// dangerouslySetInnerHTML={{ __html: step.content }}
								dir={theme.direction}
							/>
							<BasicTabs activeTab={activeTab} contents={tabContents} />
						</Paper>
					</div>
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
							to="/apps/summarizer/sumdocs"
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
							Back to Documents
						</Button>

						<SumdocInfo sumdoc={sumdoc} />
					</div>
					<Divider />
					<List>
						{['Document', 'Summaries'].map((text, index) => (
							<ListItem
								key={text}
								disablePadding
								button
								selected={activeTab === index}
								onClick={() => handleTabChange(index)}
							>
								<ListItemButton>
									<ListItemIcon>{icons[index]}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</>
			}
			scroll="content"
			ref={pageLayout}
		/>
	);
}

export default Sumdoc;
