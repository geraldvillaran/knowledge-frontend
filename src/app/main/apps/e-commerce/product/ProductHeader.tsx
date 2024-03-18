import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
	EcommerceProduct,
	useCreateECommerceProductMutation,
	useDeleteECommerceProductMutation,
	useUpdateECommerceProductMutation
} from '../ECommerceApi';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress'

/**
 * The product header.
 */
function ProductHeader() {
	const routeParams = useParams();
	const { productId } = routeParams;

	const [createProduct] = useCreateECommerceProductMutation();
	const [saveProduct] = useUpdateECommerceProductMutation();
	const [removeProduct] = useDeleteECommerceProductMutation();

	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;

	const theme = useTheme();
	const navigate = useNavigate();

	const { name, images, featuredImageId } = watch() as EcommerceProduct;

	const [loading, setLoading] = useState(false);
	const [saved, setSaved] = useState(false);

	const handleSaveProduct = async () => {
		setLoading(true);
		try {
			await saveProduct(getValues() as EcommerceProduct).unwrap();
			// Successfully saved
			setSaved(true);
			setTimeout(() => {
				// Reset states after showing "Saved" for a brief period
				setSaved(false);
				setLoading(false);
			}, 2000);
		} catch (error) {
			console.error('Save product failed:', error);
			// Handle error appropriately
			setLoading(false);
		}
	};

	const handleCreateProduct = async () => {
		setLoading(true); // Start loading
		setSaved(false); // Reset saved state
		const productValues = getValues() as EcommerceProduct;

		// Define hardcoded values for new fields
		const newFieldValues = {
			title: 'New Document',
			slug: 'new-product',
			category: 'contracts',
			duration: 30,
			totalSteps: 3,
			updatedAt: '2024-03-12T12:00:00',
			featured: false,
			progress: [{ "currentStep": "1", "completed": "50" }],
			steps: [{
				"order": 0,
				"title": "Get the sample code",
				"subtitle": "Where to find the sample code and how to access it",
				"content": "Get the sample code"
			},
			{
				"order": 1,
				"title": "Get the sample code",
				"subtitle": "Where to find the sample code and how to access it",
				"content": "Get the sample code"
			},
			{
				"order": 2,
				"title": "Get the sample code",
				"subtitle": "Where to find the sample code and how to access it",
				"content": "Get the sample code"
			}]
		};

		// Merge the hardcoded values with the product data
		const mergedData = { ...productValues, ...newFieldValues };

		try {
			const data = await createProduct(mergedData).unwrap();
			console.log('Creating product with values:', mergedData);
			navigate(`/apps/e-commerce/products/${data.id}`);
			setSaved(true); // Mark as saved
			setTimeout(() => {
				setSaved(false); // Reset saved state
				setLoading(false); // End loading
			}, 2000);
		} catch (error) {
			console.error('Creating product failed:', error);
			setLoading(false); // Ensure loading is stopped on error
		}
	};

	function handleRemoveProduct() {
		removeProduct(productId);
		navigate('/apps/e-commerce/products');
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
				>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/e-commerce/products"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">Documents</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{images && images.length > 0 && featuredImageId ? (
							<img
								className="w-32 sm:w-48 rounded"
								src={_.find(images, { id: featuredImageId })?.url}
								alt={name}
							/>
						) : (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={name}
							/>
						)}
					</motion.div>
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{name || 'New Product'}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							Document Detail
						</Typography>
					</motion.div>
				</div>
			</div>
			<motion.div
				className="flex flex-1 w-full"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{productId !== 'new' ? (
					<>
						{!loading && (
							<Button
								className="whitespace-nowrap mx-4"
								variant="contained"
								color="secondary"
								onClick={handleRemoveProduct}
								startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
							>
								Remove
							</Button>
						)}
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							disabled={loading || _.isEmpty(dirtyFields) || !isValid}
							onClick={handleSaveProduct}
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

					</>
				) : (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						disabled={loading || _.isEmpty(dirtyFields) || !isValid}
						onClick={handleCreateProduct}
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
				)}
			</motion.div>
		</div>
	);
}

export default ProductHeader;
