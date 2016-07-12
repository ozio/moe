const gulp = require('gulp');
const sequence = require('gulp-sequence');

gulp.task('build', sequence(
  'lint', 
  'clean', 
  'compile', 
  'min', 
  'version'
));
