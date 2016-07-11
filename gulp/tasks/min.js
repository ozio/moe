const gulp = require('gulp');
const uglify = require('gulp-uglifyjs');
const debug = require('gulp-debug');

gulp.task('min', () => {
  const stream = gulp.src('dist/moe.js')
    .pipe(debug())
    .pipe(uglify('moe.min.js', {
      inSourceMap: 'dist/moe.js.map',
      outSourceMap: 'moe.min.js.map',
      output: {
        comments: (node, comment) => {
          if (comment.type === 'comment2') {
            return /@license/i.test(comment.value);
          }

          return false;
        },
      },
    }))
    .pipe(gulp.dest('dist'));

  return stream;
});
