const gulp = require("gulp");
let commonData = {};

function lazyRequireTask(taskName, path, options = {}) {
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);
		return task(callback);
	})
}

//cleaning tasks
lazyRequireTask("cleanAll", "./gulp/tasks/delete.js", {
	target:"./output"
});

//basic tasks
lazyRequireTask("locals", "./gulp/tasks/locals.js", {
	src: "./source/templates/data/**/*.json",
	writeInto: commonData
});

lazyRequireTask("templates", "./gulp/tasks/templates.js", {
	src: "./source/templates/*.pug",
	dest: "./output/",
	commonData: commonData
});

lazyRequireTask("styles", "./gulp/tasks/styles.js", {
	src: "source/styles/*.scss",
	dest: "output/styles"
});

lazyRequireTask("scripts", "./gulp/tasks/scripts.js", {
	src: "./source/scripts/*.js",
	dest: "./output/scripts/"
});

lazyRequireTask("fonts", "./gulp/tasks/replace.js", {
	src: "./source/fonts/*",
	dest: "./output/fonts/"
});

lazyRequireTask("raster", "./gulp/tasks/replace.js", {
	src: "./source/images/raster/*",
	dest: "./output/images/raster/"
});

lazyRequireTask("vector", "./gulp/tasks/replace.js", {
	src: "./source/images/vector/*",
	dest: "./output/images/vector/"
});

lazyRequireTask("svgSprites", "./gulp/tasks/svgSprites.js", {
	src: "./source/images/vector/*",
	dest: "./output/images/vector/sprites/"
});

//watch tasks
lazyRequireTask("watchLocals", "./gulp/tasks/watch.js", {
	src: "source/templates/data/**/*.json",
	tasks: ["locals", "templates"]
});

lazyRequireTask("watchTemplates", "./gulp/tasks/watch.js", {
	src: "source/templates/**/*.pug",
	tasks: ["templates"]
});

lazyRequireTask("watchStyles", "./gulp/tasks/watch.js", {
	src: "source/styles/**/*.scss",
	tasks: ["styles"]
});

lazyRequireTask("watchScripts", "./gulp/tasks/watch.js", {
	src: "source/scripts/**/*.js",
	tasks: ["scripts"]
});

lazyRequireTask("watchFonts", "./gulp/tasks/watch.js", {
	src: ["source/fonts/**/*.woff", "source/fonts/**/*.woff2", "source/fonts/**/*.css"],
	tasks: ["fonts"]
});

lazyRequireTask("watchImages", "./gulp/tasks/watch.js", {
	src: ["source/images/raster/*", "source/images/vector/**/*.svg"],
	tasks: ["raster", "vector", "svgSprites"]
});

lazyRequireTask("hotReload", "./gulp/tasks/hotReload.js", {
	dest: "output",
	watch: ["output/*.html", 
			"output/styles/*.css", 
			"output/scripts/*.js", 
			"output/fonts/**/*.woff", 
			"output/fonts/**/*.woff2", 
			"output/fonts/**/*.css", 
			"output/images/raster/*.jpg",
			"output/images/raster/*.png",
			"output/images/raster/*.gif",
			"output/images/raster/*.webp",
			"output/images/vector/*.svg"
		]
});

//API
let mainLine = gulp.series("cleanAll", 
							"locals", 
							"templates", 
							"styles", 
							"scripts", 
							"fonts", 
							"raster", 
							"vector", 
							"svgSprites");

let watchers = gulp.parallel("watchLocals", 
							"watchTemplates", 
							"watchStyles", 
							"watchScripts", 
							"watchFonts", 
							"watchImages", 
							"hotReload");

gulp.task("dev", gulp.series(mainLine, watchers));

gulp.task("prod", mainLine);