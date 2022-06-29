import depcheckConfig from '@smg/depcheck';
import packageJson from './package.json';

depcheckConfig
	.depcheck(__dirname, depcheckConfig.config)
	.then((unused) => depcheckConfig.callback(unused, packageJson.name));
