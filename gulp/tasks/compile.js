const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const header = require('gulp-header');
const notify = require('gulp-notify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const transform = require('vinyl-transform');
const exorcist = require('exorcist');

const pkg = require('../../package.json');
const headerText = fs.readFileSync(path.join(__dirname, '../header.txt'), 'utf8');
const licenseText = fs.readFileSync(path.join(__dirname, '../../LICENSE'), 'utf8');

gulp.task('compile', () => {
  const stream = browserify({
    entries: paths.entry,
    debug: true,
  })
  .transform(babelify)
  .bundle()
  .pipe(source('moe.js'))
  .pipe(buffer())
  .pipe(header(headerText, { pkg, licenseText, date: new Date().toISOString() }))
  .pipe(transform(() => exorcist('dist/moe.js.map')))
  .pipe(gulp.dest('dist'));

  stream.on('error', notify.onError((error) => {
    stream.emit('end');

    return {
      title: '萌え.js — compile error',
      message: error.message,
    };
  }));

  return stream;
});
