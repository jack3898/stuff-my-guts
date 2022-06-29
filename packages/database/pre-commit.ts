import depcheckConfig from '@smg/depcheck';
import depcheck from 'depcheck';
import packageJson from './package.json';

depcheck(__dirname, depcheckConfig.config).then((unused) =>
	depcheckConfig.callback(unused, packageJson.name)
);
