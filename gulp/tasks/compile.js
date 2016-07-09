const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const header = require('gulp-header');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const transform = require('vinyl-transform');
const exorcist = require('exorcist');
// const umd = require('gulp-umd');

const pkg = require('../../package.json');
const headerText = fs.readFileSync(path.join(__dirname, '../header.txt'), 'utf8');
const licenseText = fs.readFileSync(path.join(__dirname, '../../LICENSE'), 'utf8');

gulp.task('compile', () => {
  const sequence = browserify({
    entries: 'src/moe.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('moe.js'))
  .pipe(buffer())
  .pipe(header(headerText, { pkg, licenseText, date: new Date().toISOString() }))

  /* The next three lines looks really weird, but that is not a bug. */

  .pipe(gulp.dest('dist'))
  .pipe(transform(() => exorcist('dist/moe.js.map')))
  .pipe(gulp.dest('dist'));

  return sequence;
});
