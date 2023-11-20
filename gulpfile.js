/// <binding ProjectOpened='watch-sass, watch-html' />
var gulp = require('gulp')
    sass = require('gulp-dart-sass')
    cleancss = require('gulp-clean-css')
    concat = require('gulp-concat')
    rename = require('gulp-rename')
    fileInclude = require('gulp-file-include')
    htmlBeautify = require('gulp-html-beautify');

var options = {
    css: {
        sassMainFile: 'src/bootsteam.scss',
        output: 'bootsteam-theme.css',
        sassFiles: 'src/**/*.scss',
        dest: 'dist',
        docs: 'docs/css'
    },
    html: {
        files: 'docs-templates/*.html',
        watchFiles: 'docs-templates/**/*.html',
        dest: 'docs'
    }
};

gulp.task('build-css', function () {
    return gulp.src(options.css.sassMainFile)
        .pipe(sass({ errLogToConsole: true }).on('error', sass.logError))
        .pipe(concat(options.css.output))
        .pipe(gulp.dest(options.css.dest))
        .pipe(cleancss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(options.css.dest))
        .pipe(gulp.dest(options.css.docs));
});

gulp.task('build-html', function () {
    return gulp.src(options.html.files)
        .pipe(fileInclude())
        .pipe(htmlBeautify())
        .pipe(gulp.dest(options.html.dest));
});

gulp.task('watch-sass', function () {
    return gulp.watch(options.css.sassFiles, gulp.parallel(['build-css']));
});

gulp.task('watch-html', function () {
    return gulp.watch(options.html.watchFiles, gulp.parallel(['build-html']));
})

gulp.task('default', gulp.parallel(['build-css']));