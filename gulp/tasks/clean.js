const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean', () => {
  const stream = gulp.src('dist/**/*', { read: false })
    .pipe(clean());

  return stream;
});
