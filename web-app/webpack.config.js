

const webpack = require("webpack");
const path = require("path");

const SRC_DIR = path.resolve(__dirname, "src");

const config = {
	entry:'./src/index.js',
	output: {
		path:path.resolve(__dirname, "build/js/"),
		filename:'bundle.js'
	},
	devServer:{
		contentBase:path.join(__dirname, "build"),
		compress:true,
		hot:false,/*
		port:8000,*/
		open:true,
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test:/\.js$/,
				exclude:/node_modules/,
				include:SRC_DIR,
				use:[
					{
						loader:"babel-loader"
					}
				]
			},
			{
				test:/\.scss$/,
				use:[
					{
						loader:"style-loader"
					},
					{
						loader:"css-loader"
					}, 
					{
						loader:"sass-loader",
						options: {
							includePath:[path.resolve(__dirname, "css")]
						}
					}
				]
			}
		]
	},
	plugins: [
	  new webpack.DefinePlugin({
	    'process.env': {
	      'NODE_ENV': JSON.stringify('production')
	    }
	  })
	],
	resolveLoader: {
		moduleExtensions: ["-loader"]
	}
};

module.exports = config;