const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
  const stream = gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());

  return stream;
});
