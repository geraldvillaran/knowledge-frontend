import { FuseRouteConfigsType } from '@fuse/utils/FuseUtils';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import SummarizerAppConfig from './summarizer/SummarizerAppConfig';
import AcademyAppConfig from './academy/AcademyAppConfig';
import ECommerceAppConfig from './e-commerce/ECommerceAppConfig';

/**
 * The list of application configurations.
 */
const appsConfigs: FuseRouteConfigsType = [
	AcademyAppConfig,
	SummarizerAppConfig,
	ECommerceAppConfig,
	FileManagerAppConfig
];

export default appsConfigs;
