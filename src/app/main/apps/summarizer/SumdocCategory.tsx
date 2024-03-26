import { darken, lighten } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import _ from 'lodash'; // Ensure the correct import statement for lodash
import { Sumdoc, useGetSumdocCategoriesQuery } from './SummarizerApi';

type SumdocCategoryProps = {
	slug: Sumdoc['slug'];
};

/**
 * The SumdocCategory component with a fix for the undefined color.
 */
function SumdocCategory(props: SumdocCategoryProps) {
	const { slug } = props;

	const { data: categories } = useGetSumdocCategoriesQuery();

	const category = _.find(categories, { slug });

	// Default color if category or category.color is undefined
	const defaultColor = '#ccc'; // Example default color, adjust as needed

	return (
		<Chip
			className="font-semibold text-12"
			label={category?.title || 'General'} // Fallback title
			sx={{
				color: (theme) =>
					theme.palette.mode === 'light'
						? darken(category?.color || defaultColor, 0.4)
						: lighten(category?.color || defaultColor, 0.8),
				backgroundColor: (theme) =>
					theme.palette.mode === 'light'
						? lighten(category?.color || defaultColor, 0.8)
						: darken(category?.color || defaultColor, 0.1),
			}}
			size="small"
		/>
	);
}

export default SumdocCategory;
