import { FuseRouteConfigsType } from '@fuse/utils/FuseUtils';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import AcademyAppConfig from './academy/AcademyAppConfig';
import ECommerceAppConfig from './e-commerce/ECommerceAppConfig';
import SummarizerAppConfig from './summarizer/SummarizerAppConfig';

/**
 * The list of application configurations.
 */
const appsConfigs: FuseRouteConfigsType = [
	AcademyAppConfig,
	ECommerceAppConfig,
	FileManagerAppConfig,
	SummarizerAppConfig
];

export default appsConfigs;
