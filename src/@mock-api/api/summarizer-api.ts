import _ from '@lodash';
import mockApi from '../mock-api.json';
import ExtendedMockAdapter, { Params } from '../ExtendedMockAdapter';
import { Sumdoc } from '../../app/main/apps/summarizer/SummarizerApi';

const demoSumdocContent = mockApi.components.examples.academy_demo_course_content.value;
const exampleSumdocSteps = mockApi.components.examples.academy_demo_course_steps.value;

const steps = exampleSumdocSteps.map((item) => ({
	...item,
	content: `${item.content} ${demoSumdocContent}`
}));
const sumdocs = mockApi.components.examples.academy_courses.value;
const categoriesDB = mockApi.components.examples.academy_categories.value;

const sumdocsDB = sumdocs.map((sumdoc) => ({
	...sumdoc,
	steps
}));

export const summarizerApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/summarizer/sumdocs').reply(() => {
		return [200, sumdocsDB];
	});

	mock.onGet('/summarizer/sumdocs/:sumdocId').reply((config) => {
		const { sumdocId } = config.params as Params;
		const sumdoc = _.find(sumdocsDB, { id: sumdocId });

		if (!sumdoc) {
			return [404, 'Requested data do not exist.'];
		}

		return [200, sumdoc];
	});

	mock.onPut('/summarizer/sumdocs/:sumdocId').reply((config) => {
		const { sumdocId } = config.params as Params;

		const sumdoc = _.find(sumdocsDB, { id: sumdocId }) as Sumdoc;

		const newData = JSON.parse(config.data as string) as Sumdoc;

		if (!sumdoc) {
			return [404, 'Requested data do not exist.'];
		}

		_.assign(sumdoc, _.merge({}, sumdoc, newData));

		if (newData?.progress?.currentStep === sumdoc?.totalSteps) {
			_.assign(sumdoc, _.merge({}, sumdoc, { progress: { completed: sumdoc.progress.completed + 1 } }));
		}

		return [200, sumdoc];
	});

	mock.onGet('/summarizer/categories').reply(() => {
		return [200, categoriesDB];
	});
};
