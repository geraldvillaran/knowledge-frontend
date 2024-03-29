import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTheme } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { CardActions, Step, StepContent, StepLabel } from '@mui/material';
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
import BasicTabs, { BasicTabsProps } from '../sumdoc/SumdocTabs';
import SummaryCardMock from './SummaryCardMock';
import SummaryCard from './SummaryCard';
import SumdocEvalChart from './SumdocEvalChart';
import SumdocModel from './models/SumdocModel';
import TextField from '@mui/material/TextField';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CircularProgress from '@mui/material/CircularProgress';
import _ from '@lodash';
import { Controller, useFormContext } from 'react-hook-form';
import {
	Sumdoc as SumdocApi,
	useGetSummarizedDocQuery,
	useUpdateSummarizedDocMutation,
	useDeleteSummarizedDocMutation
} from '../SummarizerApi';
import { padding } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
/**
 * The Sumdoc page.
 */

const drawerWidth = 240;
const icons = [<ArticleIcon />, <SummarizeIcon />, <StackedLineChartIcon />];

/**
 * Form Validation Schema
 */
const schema = z.object({
	description: z.string().nonempty('You must enter a product name').min(5, 'The product name must be at least 5 characters')
});

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

	const [saveDocument] = useUpdateSummarizedDocMutation();
	const [removeDocument] = useDeleteSummarizedDocMutation();

	const methods = useForm({
		mode: 'onChange',
		resolver: zodResolver(schema),
		defaultValues: {
			description: '' // Ensure there's a default value to reset to
		}
	});

	const { control, formState, reset, watch, getValues } = methods;
	const form = watch();
	const { description } = watch() as SumdocApi;
	const { isValid, dirtyFields } = formState;

	const [activeTab, setActiveTab] = useState(0);

	const [loading, setLoading] = useState(false);
	const [saved, setSaved] = useState(false);
	const { errors } = formState;

	useEffect(() => {
		if (sumdoc) {
			reset({
				description: sumdoc.description // Assuming `description` is the correct property
			});
		}
	}, [sumdoc, reset]);

	const [openDialog, setOpenDialog] = useState(false);

	const handleDialogOpen = () => {
		setOpenDialog(true);
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	const handleSaveDocument = async () => {
		setLoading(true);
		setSaved(false); // Reset saved state
		const currentDescription = getValues().description;
		// Define static data for testing
		const staticData = {
			id: sumdocId, // Use the sumdocId from your component's state
			description: currentDescription,
			name: "Test Document",
			handle: "test-document",
			category: "Test Category",
			categories: ["Test Category"],
			tags: ["Test", "Static Data"],
			featuredImageId: "1",
			images: [
				{
					id: "1",
					url: "https://example.com/image.jpg",
					type: "image", // Added 'type' property
				},
			],
			priceTaxExcl: 100,
			priceTaxIncl: 110,
			taxRate: 10,
			comparedPrice: 120,
			quantity: 50,
			sku: "TESTSKU123",
			width: "10cm",
			height: "20cm",
			depth: "5cm",
			weight: "1kg",
			extraShippingFee: 5,
			active: true,
			title: "Test Document Title",
			slug: "test-document-title",
			duration: 120,
			totalSteps: 3,
			updatedAt: "2024-01-01T00:00:00Z",
			featured: false,
			progress: [
				{ currentStep: "1", completed: "50%" }
			],
			steps: [
				{
					order: 1,
					title: "Step 1",
					subtitle: "Introduction",
					content: "This is the content of Step 1.",
				},
			],
			summaries: [
				{
					summary_a: [
						{
							model: "Model A",
							summary: "Summary from Model A",
						},
					],
					summary_b: [
						{
							model: "Model B",
							summary: "Summary from Model B",
						},
					],
				},
			],
		};

		try {
			console.log("Saving document with static data:", staticData);
			await saveDocument(staticData).unwrap();

			setSaved(true);
			setTimeout(() => {
				setSaved(false);
				setLoading(false);
			}, 2000);
		} catch (error) {
			console.error('Save document failed:', error);
			setLoading(false);
		}
	};

	const navigate = useNavigate();

	function handleRemoveProduct() {
		removeDocument(sumdocId);
		navigate('/apps/summarizer/sumdocs');
		handleDialogClose();
	}

	const tabContents = [
		/* Content for 'Document' */

		<>
			<Dialog
				open={openDialog}
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete this document?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleRemoveProduct} color="secondary" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Box display="flex" justifyContent="flex-end" mb={2}> {/* Use Box to manage layout */}
				{!loading && (
					<Button
						className="whitespace-nowrap"
						variant="contained"
						color="secondary"
						onClick={handleDialogOpen}
						startIcon={<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>}
						sx={{ ml: 2 }} // Apply margin-left directly to the Button for spacing
					>
						Remove
					</Button>
				)}
			</Box>
			<FormProvider {...methods}>
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<TextField
							{...field} // Spread the field props to TextField
							fullWidth
							variant="outlined"
							id="description"
							multiline={true}
							type="text"
							label="Document Text"
							rows={30}
							InputProps={{
								style: {
									lineHeight: '1.5', // Adjust the line spacing as needed
								},
							}}
						/>
					)}
				/>
				<CardActions sx={{ padding: 0 }}>
					<Box display="flex" justifyContent="flex-end" p={0} mt={2}> {/* Adjusts the margin-top for spacing */}
						<Button
							className="whitespace-nowrap"
							variant="contained"
							color="secondary"
							disabled={loading || _.isEmpty(dirtyFields) || !isValid}
							onClick={handleSaveDocument}
						>
							{loading ? (
								<>
									<CircularProgress size={14} color="inherit" />
									&nbsp;Summarizing...
								</>
							) : saved ? (
								"Summarized"
							) : (
								"Summarize"
							)}
						</Button>
					</Box>
				</CardActions>
			</FormProvider>

		</>,
		/* Content for 'Summaries' */
		<>
			<div style={{ display: 'flex' }}>
				{sumdoc?.summaries.map((summary, index) => {
					// Extract key and value pairs from the summary object (summary_a, summary_b, etc.)
					// Assuming there's only one key-value pair per summary object in the array
					const [key, valueArray] = Object.entries(summary)[0];
					// Assuming valueArray always contains at least one item and we're interested in the first one
					const { model, summary: summaryText } = valueArray[0]; // Renamed to summaryText

					return (
						<div key={index} style={{ flex: 1, marginRight: index < sumdoc.summaries.length - 1 ? '10px' : '0' }}>
							<SummaryCard model={model} summary={summaryText} /> {/* Use summaryText here */}
						</div>
					);
				})}
			</div>
		</>
	];

	const handleTabChange = (index: number) => {
		setActiveTab(index);
	};



	// useEffect(() => {
	// 	/**
	// 	 * If the sumdoc is opened for the first time
	// 	 * Change ActiveStep to 1
	// 	 */
	// 	if (sumdoc && sumdoc?.progress?.currentStep === 0) {
	// 		updateSumdoc({ sumdocId, data: { progress: { currentStep: 1 } } });
	// 	}
	// }, [sumdoc]);

	// useEffect(() => {
	// 	setLeftSidebarOpen(!isMobile);
	// }, [isMobile]);

	// const currentStep = sumdoc?.progress?.currentStep || 0;

	// function updateCurrentStep(index: number) {
	// 	if (sumdoc && (index > sumdoc.totalSteps || index < 0)) {
	// 		return;
	// 	}

	// 	// updateSumdoc({ sumdocId, data: { progress: { currentStep: index } } });
	// }

	// function handleNext() {
	// 	updateCurrentStep(currentStep + 1);
	// }

	// function handleBack() {
	// 	updateCurrentStep(currentStep - 1);
	// }

	// function handleStepChange(index: number) {
	// 	updateCurrentStep(index + 1);
	// }

	// const activeStep = currentStep !== 0 ? currentStep : 1;

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
