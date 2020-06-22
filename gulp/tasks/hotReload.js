const browserSync = require("browser-sync").create();

module.exports = function(options) {
	return function() {
		browserSync.init({
			server: options.dest //folder, where all files lay
		})
		browserSync.watch(options.watch).on("change", browserSync.reload);
	};
}