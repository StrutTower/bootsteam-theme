/// <binding ProjectOpened='sass-watch' />
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename');

//Options
var options = {
    sass: {
        src: ['src/bootsteam.scss'],
        files: 'src/**/*.scss',
        dest: 'dist'
    }
}

//Tasks
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
        .pipe(cleancss({
            level: { 1: { specialComments: 0 }}
        }))
        .pipe(gulp.dest(options.sass.dest));
});

gulp.task('sass-watch', function () {
    return gulp.watch(options.sass.files, gulp.parallel('sass'));
})

gulp.task('default', gulp.parallel('sass'));