import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import SumdocInfo from '../SumdocInfo';
import SumdocProgress from '../SumdocProgress';
import { Sumdoc } from '../SummarizerApi';

type SumdocCardProps = {
	sumdoc: Sumdoc;
};

/**
 * The SumdocCard component.
 */
function SumdocCard(props: SumdocCardProps) {
	const { sumdoc } = props;

	function buttonStatus() {
		switch (sumdoc.activeStep) {
			case sumdoc.totalSteps:
				return 'Completed';
			case 0:
				return 'Start';
			default:
				return 'Continue';
		}
	}

	return (
		<Card className="flex flex-col h-384 shadow">
			<CardContent className="flex flex-col flex-auto p-24">
				<SumdocInfo sumdoc={sumdoc} />
			</CardContent>
			<SumdocProgress sumdoc={sumdoc} />
			<CardActions
				className="items-center justify-end py-16 px-24"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? lighten(theme.palette.background.default, 0.4)
							: lighten(theme.palette.background.default, 0.03)
				}}
			>
				<Button
					to={`/apps/summarizer/sumdocs/${sumdoc.id}/${sumdoc.slug}`}
					component={Link}
					className="px-16 min-w-128"
					color="secondary"
					variant="contained"
					endIcon={<FuseSvgIcon size={20}>heroicons-solid:arrow-sm-right</FuseSvgIcon>}
				>
					{buttonStatus()}
				</Button>
			</CardActions>
		</Card>
	);
}

export default SumdocCard;
