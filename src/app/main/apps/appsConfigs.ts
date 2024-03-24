import { FuseRouteConfigsType } from '@fuse/utils/FuseUtils';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import AcademyAppConfig from './academy/AcademyAppConfig';
import ECommerceAppConfig from './e-commerce/ECommerceAppConfig';

/**
 * The list of application configurations.
 */
const appsConfigs: FuseRouteConfigsType = [
	AcademyAppConfig,
	ECommerceAppConfig,
	FileManagerAppConfig
];

export default appsConfigs;
