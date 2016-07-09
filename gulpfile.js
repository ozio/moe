const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const transform = require('vinyl-transform');
const browserify = require('browserify');
const babelify = require('babelify');
const exorcist = require('exorcist');
const gulp = require('gulp');
const uglify = require('gulp-uglifyjs');
// const umd = require('gulp-umd');
const seq = require('gulp-sequence');
const clean = require('gulp-clean');

gulp.task('browserify', () => {
  const sequence = browserify({
    entries: './src/moe.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('moe.js'))
  .pipe(buffer())

  /* Three lines at the bottom looks really weird, but that is not a bug. */

  .pipe(gulp.dest('dist'))
  .pipe(transform(() => exorcist('./dist/moe.js.map')))
  .pipe(gulp.dest('dist'));

  return sequence;
});

gulp.task('uglify', () => {
  const sequence = gulp.src('dist/moe.js')
  .pipe(uglify('moe.min.js', {
    inSourceMap: 'dist/moe.js.map',
    outSourceMap: 'moe.min.js.map'
  }))
  .pipe(gulp.dest('dist'));

  return sequence;
});

gulp.task('clean', () => {
  const sequence = gulp.src('dist/**/*', { read: false })
  .pipe(clean());

  return sequence;
});

gulp.task('build', seq('clean', 'browserify', 'uglify'));

gulp.task('watch', ['browserify'], () => {
  gulp.watch('**/*.js', ['browserify']);
});

gulp.task('default', seq('clean', 'watch'));
