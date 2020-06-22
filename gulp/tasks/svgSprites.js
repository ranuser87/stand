const gulp = require("gulp");
const svgSprites = require("gulp-svg-sprites");

module.exports = function(options) {
	return function() {
		return gulp.src(options.src)
			.pipe(svgSprites({
				mode: "symbols"
			}))
			.pipe(gulp.dest(options.dest));
	};
}