const gulp = require('gulp');

gulp.task('watch', () => gulp.watch('src/**/*.js', ['lint', 'compile']));
