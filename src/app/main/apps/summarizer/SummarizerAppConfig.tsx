import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const SummarizerApp = lazy(() => import('./SummarizerApp'));
const Course = lazy(() => import('./course/Course'));
const Courses = lazy(() => import('./courses/Courses'));

/**
 * The Academy app config.
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
					element: <Navigate to="/apps/summarizer/courses" />
				},
				{
					path: 'courses/:courseId/*',
					element: <Course />
				},
				{
					path: 'courses',
					element: <Courses />
				}
			]
		}
	]
};

export default SummarizerAppConfig;
