const gulp = require("gulp");
const pug = require("pug");
const path = require("path");
const multipipe = require("multipipe");
const through2 = require("through2").obj;
const notify = require("gulp-notify");

function getPathToPugDirectory() {
	return path.resolve(process.cwd(), "source", "templates");
}

module.exports = function(options) {
	return function() {
		return multipipe(
			gulp.src(options.src),
			through2(function(file, encoding, callback) {
				try {
					let fileContent = file.contents.toString();
					let fn = pug.compile(fileContent, {
						pretty: true,
						filename: path.resolve(getPathToPugDirectory(), file.basename),
						basedir: getPathToPugDirectory()
					});
					let html = fn(options.commonData.locals);
					let newBuffer = Buffer.from(html);
					file.contents = newBuffer;
					file.extname = ".html";
					callback(null, file);
				} catch(e) {
					callback(new Error(e.message, e.fileName, e.lineNumber));
				}
			}),
			gulp.dest(options.dest)
		).on("error", notify.onError());
	}
}