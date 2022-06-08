import { Configuration as DevServerConfig } from 'webpack-dev-server';

const devServerConfig: DevServerConfig = {
	port: 9000,
	open: true,
	static: {
		directory: 'assets'
	},
	hot: true
};

export default devServerConfig;
