import { ROOT } from '@mealideas/paths';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration as WebpackConfig } from 'webpack';

dotenv.config({ path: path.resolve(ROOT, '.env') });

const APP_DIR = path.resolve();
const CONFIG_DIR = path.resolve(__dirname);

const webpackConfig: WebpackConfig = {
	mode: process.env.NODE_ENV as any,
	devtool: 'source-map',
	output: {
		path: path.resolve(APP_DIR, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	resolveLoader: {
		modules: [path.resolve(ROOT, 'node_modules')]
	},
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: 'assets/[hash].[ext]'
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['tailwindcss', 'autoprefixer']
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(CONFIG_DIR, 'template.html')
		})
	]
};

export default webpackConfig;
