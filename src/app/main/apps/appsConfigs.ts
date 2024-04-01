import { FuseRouteConfigsType } from '@fuse/utils/FuseUtils';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import AcademyAppConfig from './academy/AcademyAppConfig';
import ECommerceAppConfig from './e-commerce/ECommerceAppConfig';
import SummarizerAppConfig from './summarizer/SummarizerAppConfig';
import TasksAppConfig from './tasks/TasksAppConfig';
import ScrumboardAppConfig from './scrumboard/ScrumboardAppConfig';

/**
 * The list of application configurations.
 */
const appsConfigs: FuseRouteConfigsType = [
	AcademyAppConfig,
	ECommerceAppConfig,
	FileManagerAppConfig,
	SummarizerAppConfig,
	TasksAppConfig,
	ScrumboardAppConfig
];

export default appsConfigs;
