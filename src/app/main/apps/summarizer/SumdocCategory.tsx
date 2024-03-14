import { darken, lighten } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import _ from '@lodash';
import { Sumdoc, useGetSumdocCategoriesQuery } from './SummarizerApi';

type SumdocCategoryProps = {
	slug: Sumdoc['slug'];
};

/**
 * The SumdocCategory component.
 */
function SumdocCategory(props: SumdocCategoryProps) {
	const { slug } = props;

	const { data: categories } = useGetSumdocCategoriesQuery();

	const category = _.find(categories, { slug });

	if (!category) {
	}

	return (
		<Chip
			className="font-semibold text-12"
			label={category?.title}
			sx={{
				color: (theme) =>
					theme.palette.mode === 'light' ? darken(category?.color, 0.4) : lighten(category?.color, 0.8),
				backgroundColor: (theme) =>
					theme.palette.mode === 'light' ? lighten(category?.color, 0.8) : darken(category?.color, 0.1)
			}}
			size="small"
		/>
	);
}

export default SumdocCategory;
