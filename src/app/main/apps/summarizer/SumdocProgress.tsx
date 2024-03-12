import LinearProgress from '@mui/material/LinearProgress';
import clsx from 'clsx';
import { Sumdoc } from './SummarizerApi';

type SumdocProgressProps = {
	sumdoc: Sumdoc;
	className?: string;
};

/**
 * The SumdocProgress component.
 */
function SumdocProgress(props: SumdocProgressProps) {
	const { sumdoc, className } = props;

	return (
		<LinearProgress
			className={clsx('w-full h-2', className)}
			variant="determinate"
			value={(sumdoc.progress.currentStep * 100) / sumdoc.totalSteps}
			color="secondary"
		/>
	);
}

export default SumdocProgress;
