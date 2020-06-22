const gulp = require("gulp");
const multipipe = require("multipipe");
const through2 = require("through2").obj;
const notify = require("gulp-notify");

module.exports = function(options) {
	return function(callback) {
		let commonData = options.writeInto;
		delete commonData.locals;
		commonData.locals = {};
		return multipipe(
			gulp.src(options.src),
			through2(function(file, encoding, callback) {
				try {
					let fileContent = JSON.parse(file.contents.toString());
					let fileName = file.stem;
					commonData.locals[fileName] = fileContent;
					callback(null, file);
				} catch(e) {
					callback(new Error(e.message, e.fileName, e.lineNumber));
				}
			})
		).on("error", notify.onError());
	};
}