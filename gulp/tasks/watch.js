const gulp = require("gulp");

module.exports = function(options) {
	return function() {
		gulp.watch(options.src, gulp.series(...options.tasks));
	};
}

