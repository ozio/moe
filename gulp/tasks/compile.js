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

const headerText = fs.readFileSync(path.join(__dirname, '../header.txt'), 'utf8');
const licenseText = fs.readFileSync(path.join(__dirname, '../../LICENSE'), 'utf8');

const browserifyConfig = {
  entries: paths.entry,
  debug: true,
  standalone: 'moe',
};

gulp.task('compile', () => {
  const notifyHandler = notify.onError((error) => {
    stream.emit('end');

    const rootPath = path.join(__dirname, '../../gamme/').slice(0, -1);
    const errorString = error.message
      .split(':')
      .slice(1)
      .join(':')
      .trim()
      .replace(new RegExp(rootPath, 'g'), '');

    return {
      title: 'Compile error',
      message: errorString,
    };
  });

  const stream = browserify(browserifyConfig)
    .transform(babelify)
    .bundle()
    .on('error', notifyHandler)
    .pipe(source('moe.js'))
    .pipe(buffer())
    .pipe(header(headerText, { licenseText, date: new Date().toISOString() }))
    .pipe(transform(() => exorcist('dist/moe.js.map')))
    .pipe(gulp.dest('dist'));

  return stream;
});
