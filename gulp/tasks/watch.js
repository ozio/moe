const gulp = require('gulp');

gulp.task('watch', () => gulp.watch('**/*.js', ['compile']));
