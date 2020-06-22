const gulp = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const path = require("path");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const multipipe = require("multipipe");
const isDevelopment = require("./../constants.js").isDevelopment;
const gulpIf = require("gulp-if");
const notify = require("gulp-notify");

module.exports = function(options) {
	return function(callback) {
		let pathToNodeModules = path.resolve(process.cwd(), "node_modules");
		return multipipe(
			gulp.src(options.src),
			gulpIf(isDevelopment, sourcemaps.init()),
			sass({
				includePaths: [pathToNodeModules]	
			}),
			autoprefixer(),
			gulpIf(isDevelopment, sourcemaps.write()),
			gulp.dest(options.dest)
		).on("error", notify.onError());
	}
}