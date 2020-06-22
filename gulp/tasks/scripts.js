const gulp = require("gulp");
const webpackStream = require('webpack-stream');
const path = require("path");
const multipipe = require("multipipe");
const notify = require("gulp-notify");
const isDevelopment = require("./../constants.js").isDevelopment;
const webpack = require("webpack");
const named = require('vinyl-named');

module.exports = function(options) {
	return function() {
		return multipipe(
			gulp.src(options.src),
			named(),
			webpackStream({
				mode: isDevelopment ? "development" : "production", 
				output: {
					filename: "[name].js",
				},
				module: {
					rules: [
						{
							test: /\.(js)$/,
							exclude: /(node_modules)/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: ['@babel/preset-env']
								}
							}
						}
					]
				},
				plugins: [
					new webpack.ProvidePlugin({
						$: "jquery",
						jQuery: "jquery"
					})
				]
			}),
			gulp.dest(options.dest)
		).on("error", notify.onError());
	}
}