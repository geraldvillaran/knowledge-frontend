import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const SummarizerApp = lazy(() => import('./SummarizerApp'));
const Sumdoc = lazy(() => import('./sumdoc/Sumdoc'));
const Sumdocs = lazy(() => import('./sumdocs/Sumdocs'));

/**
 * The Summarizer app config.
 */
const SummarizerAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/summarizer',
			element: <SummarizerApp />,
			children: [
				{
					path: '',
					element: <Navigate to="/apps/summarizer/sumdocs" />
				},
				{
					path: 'sumdocs/:sumdocId/*',
					element: <Sumdoc />
				},
				{
					path: 'sumdocs',
					element: <Sumdocs />
				}
			]
		}
	]
};

export default SummarizerAppConfig;
