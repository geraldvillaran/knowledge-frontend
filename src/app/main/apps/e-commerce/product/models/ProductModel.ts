import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { EcommerceProduct } from '../../ECommerceApi';

/**
 * The product model.
 */

const ProductModel = (data: PartialDeep<EcommerceProduct>) =>
	_.defaults(data || {}, {
		id: _.uniqueId('product-'),
		name: '',
		handle: '',
		description: '',
		category: '',
		categories: [],
		tags: [],
		featuredImageId: '',
		images: [],
		priceTaxExcl: 0,
		priceTaxIncl: 0,
		taxRate: 0,
		comparedPrice: 0,
		quantity: 0,
		sku: '',
		width: '',
		height: '',
		depth: '',
		weight: '',
		extraShippingFee: 0,
		active: true,
		title: '',
		slug: '',
		duration: 0,
		totalSteps: 0,
		updatedAt: '',
		featured: false,
		progress: [],
		steps: [],
		summaries: []
	});

export default ProductModel;
