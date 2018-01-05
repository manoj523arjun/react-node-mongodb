var webpack = require("webpack");
var path = require("path");

var OUT_DIR = path.resolve(__dirname, "main");

var config = {
	entry:'./app.js',
	output: {
		filename:'bundle.js',
		path:OUT_DIR+ '/app',
		publicPath: '/app/'
	}
}

module.exports = config;


