import { Configuration as WebpackConfig, webpack } from 'webpack';
import devServer, { Configuration as DevServerConfig } from 'webpack-dev-server';
import devServerConfig from './webpack-devserver.config';
import webpackConfig from './webpack.config';

export const bundler = (overrides?: WebpackConfig) => {
	return webpack(Object.assign(webpackConfig, overrides));
};

export const server = (devServerOverrides?: DevServerConfig, webpackOverrides?: WebpackConfig) => {
	return new devServer(
		Object.assign(devServerConfig, devServerOverrides),
		bundler(webpackOverrides)
	);
};
