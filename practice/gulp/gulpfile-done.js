const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
    return gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('default', ['sass']);

gulp.task('watch', ['sass:watch']);