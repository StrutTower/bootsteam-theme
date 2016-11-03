/// <binding ProjectOpened='sass-watch' />

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssMin = require('gulp-cssmin');
    rename = require('gulp-rename'),
    replace = require('gulp-replace');

var options = {
    sass: {
        src: ['src/bootsteam.scss', 'src/bootsteamWithWebfont.scss'],
        files: 'src/**/*.scss',
        dest: 'dist'
    }
}

gulp.task('default', ['sass']);


gulp.task('sass', function () {
    return gulp.src(options.sass.src)
        .pipe(sass({
            errLogToConsole: true,
            precision: 10
        })
        .on('error', sass.logError))
        .pipe(gulp.dest(options.sass.dest))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssMin({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(options.sass.dest));
});

gulp.task('sass-watch', function () {
    return gulp.watch(options.sass.files, ['sass']);
})