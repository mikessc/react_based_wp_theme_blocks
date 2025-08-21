const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//  Admin 
const adminConfig = {
	...defaultConfig,
	entry: {
		index: path.resolve(__dirname, 'src/admin/index.jsx'),
	},
	output: {
		path: path.resolve(__dirname, 'build/admin/'),
	},
	watchOptions: {
		ignored: /build/
	}
};

//  Frontend
const frontendConfig = {
	entry: {
		index: path.resolve(__dirname, 'src/frontend/index.jsx'),
	}, 
	output: {
		path: path.resolve(__dirname, 'build/frontend/')
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
		}]
	},
	plugins: [
		new MiniCssExtractPlugin()
	], 
};


module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		frontendConfig.optimization = { minimize: false };
	} else { 
		frontendConfig.optimization = { minimize: true };
	}
	return [adminConfig, frontendConfig];
};

