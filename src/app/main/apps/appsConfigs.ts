import { FuseRouteConfigsType } from '@fuse/utils/FuseUtils';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import AcademyAppConfig from './academy/AcademyAppConfig';

/**
 * The list of application configurations.
 */
const appsConfigs: FuseRouteConfigsType = [
	AcademyAppConfig,
	FileManagerAppConfig
];

export default appsConfigs;
