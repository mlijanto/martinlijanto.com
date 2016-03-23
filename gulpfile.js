var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var server = require("gulp-server-livereload");
var ts = require("gulp-typescript");

var paths = {
    ts: ["app/**/*.ts"],
    scss: ["app/styles/**/*.scss"]
};

var tsProject = ts.createProject("tsconfig.json");

gulp.task("build-sass", function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: ["node_modules"],
            outputStyle: "nested",
            sourceMap: true,
            precision: 5
        }).on("error", sass.logError))
        .pipe(gulp.dest("app/styles"))
        .pipe(cssnano())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("app/styles"));
});

gulp.task("transpile-ts", function () {
    var tsResult = gulp.src(paths.ts)
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest("app"));
});

gulp.task("build-app", [
    "build-sass",
    "transpile-ts"
]);

gulp.task("server", function () {
    gulp.src("")
        .pipe(server({
            port: "9100",
            livereload: {
                enable: true
            },
            defaultFile: "index.html",
            open: true
        }));
});

gulp.task("watch", ["build-app", "server"], function () {
    gulp.watch(paths.scss, ["build-sass"]);
    gulp.watch(paths.ts, ["transpile-ts"]);
});