import _ from '@lodash';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { Fragment } from 'react';
import { closeDialog, openDialog } from '@fuse/core/FuseDialog/fuseDialogSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import SumdocCard from './SumdocCard';
import { Sumdoc, useGetSumdocCategoriesQuery, useGetSummarizedDocsQuery } from '../SummarizerApi';

const container = {
	show: {
		transition: {
			staggerChildren: 0.04
		}
	}
};

const item = {
	hidden: {
		opacity: 0,
		y: 10
	},
	show: {
		opacity: 1,
		y: 0
	}
};

/**
 * The Sumdocs page.
 */
function Sumdocs() {
	const { data: sumdocs, isLoading } = useGetSummarizedDocsQuery();
	const { data: categories } = useGetSumdocCategoriesQuery();

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [filteredData, setFilteredData] = useState<Sumdoc[]>(sumdocs);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [hideCompleted, setHideCompleted] = useState(false);
	const dispatch = useAppDispatch();

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		function getFilteredArray() {
			if (sumdocs && searchText.length === 0 && selectedCategory === 'all' && !hideCompleted) {
				return sumdocs;
			}

			return _.filter(sumdocs, (item) => {
				if (selectedCategory !== 'all' && item.category !== selectedCategory) {
					return false;
				}

				// if (hideCompleted && item.progress.completed > 0) {
				// 	return false;
				// }

				return item.title.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (sumdocs) {
			setFilteredData(getFilteredArray());
		}
	}, [sumdocs, hideCompleted, searchText, selectedCategory]);

	function handleSelectedCategory(event: SelectChangeEvent<string>) {
		setSelectedCategory(event.target.value);
	}

	function handleSearchText(event: ChangeEvent<HTMLInputElement>) {
		setSearchText(event.target.value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<FusePageSimple
			header={<></>}
			content={
				<>
					<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
						{/* Row 1 */}
						<div>
							<Box
								className="relative overflow-hidden flex shrink-0 items-center justify-center mb-20 py-32 md:p-64"
								sx={{
									backgroundColor: 'primary.main',
									color: (theme: Theme) => theme.palette.getContrastText(theme.palette.primary.main)
								}}
							>
								<div className="flex flex-col items-center justify-center  mx-auto w-full">
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1, transition: { delay: 0 } }}
									>
										<Typography
											color="inherit"
											className="text-18 font-semibold"
										>
											KNOWLEDGE RESEARCH INC.
										</Typography>
									</motion.div>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1, transition: { delay: 0 } }}
									>
										<Typography
											color="inherit"
											className="text-center text-32 sm:text-48 font-extrabold tracking-tight mt-4"
										>
											Legal Summarization Foundation Model
										</Typography>
									</motion.div>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1, transition: { delay: 0.3 } }}
									>
										<Typography
											color="inherit"
											className="text-16 sm:text-20 mt-16 sm:mt-24 opacity-75 tracking-tight max-w-md text-center"
										>
											Our summarization module uses large language models to quickly condense long content into concise and accurate summaries, making it easy to extract key insights.
										</Typography>
									</motion.div>
								</div>

								<svg
									className="absolute inset-0 pointer-events-none"
									viewBox="0 0 960 540"
									width="100%"
									height="100%"
									preserveAspectRatio="xMidYMax slice"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g
										className="text-gray-700 opacity-25"
										fill="none"
										stroke="currentColor"
										strokeWidth="100"
									>
										<circle
											r="234"
											cx="196"
											cy="23"
										/>
										<circle
											r="234"
											cx="790"
											cy="491"
										/>
									</g>
								</svg>
							</Box>
						</div>
						<div>
							<div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
								<div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
									<div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
										<FormControl
											className="flex w-full sm:w-136"
											variant="outlined"
										>
											<InputLabel id="category-select-label">Category</InputLabel>
											<Select
												labelId="category-select-label"
												id="category-select"
												label="Category"
												value={selectedCategory}
												onChange={handleSelectedCategory}
											>
												<MenuItem value="all">
													<em> All </em>
												</MenuItem>
												{categories?.map((category) => (
													<MenuItem
														value={category.slug}
														key={category.id}
													>
														{category.title}
													</MenuItem>
												))}
											</Select>
										</FormControl>
										<TextField
											label="Search for a Document"
											placeholder="Enter a keyword..."
											className="flex w-full sm:w-256 mx-8"
											value={searchText}
											inputProps={{
												'aria-label': 'Search'
											}}
											onChange={handleSearchText}
											variant="outlined"
											InputLabelProps={{
												shrink: true
											}}
										/>
									</div>
									<FormControl>
										<Button
											onClick={handleClickOpen}
											className="px-16 min-w-128"
											color="success"
											variant="contained"
											endIcon={<FuseSvgIcon size={20}>heroicons-solid:plus-circle</FuseSvgIcon>}
										>
											Add New Document
										</Button>
										<Dialog
											fullWidth={true}
											maxWidth={'md'}
											open={open}
											onClose={handleClose}
										>
											<DialogTitle>New Document</DialogTitle>
											<DialogContent>
												<DialogContentText
													sx={{ paddingBottom: "20px" }}
												>
													Word Count: --
												</DialogContentText>
												<TextField
													id="outlined-multiline-static"
													multiline
													rows={30}
													fullWidth
												/>
											</DialogContent>
											<DialogActions
												sx={{ padding: "25px" }}
											>
												<Button onClick={handleClose}>Close</Button>
												<Button
													color="success"
													variant="contained"
												>Summarize</Button>
											</DialogActions>
										</Dialog>
									</FormControl>
									{/* <FormControlLabel
							label="Hide completed"
							control={
								<Switch
									onChange={(ev) => {
										setHideCompleted(ev.target.checked);
									}}
									checked={hideCompleted}
									name="hideCompleted"
								/>
							}

						/> */}
								</div>
								{filteredData &&
									(filteredData.length > 0 ? (
										<motion.div
											className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40"
											variants={container}
											initial="hidden"
											animate="show"
										>
											{filteredData.map((sumdoc) => {
												return (
													<motion.div
														variants={item}
														key={sumdoc.id}
													>
														<SumdocCard sumdoc={sumdoc} />
													</motion.div>
												);
											})}
										</motion.div>
									) : (
										<div className="flex flex-1 items-center justify-center">
											<Typography
												color="text.secondary"
												className="text-24 my-24"
											>
												No documents found!
											</Typography>
										</div>
									))}
							</div>
						</div>
					</div>
				</>

			}
			scroll={isMobile ? 'normal' : 'normal'}
		/>
	);
}

export default Sumdocs;
