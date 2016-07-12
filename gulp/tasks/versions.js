const version = require('gulp-version-injector');
const gulp = require('gulp');

gulp.task('version', () => {
  gulp.src(['dist/moe.js', 'dist/moe.min.js'])
    .pipe(version('package.json'))
    .pipe(gulp.dest('dist'));
});
