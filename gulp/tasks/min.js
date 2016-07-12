const gulp = require('gulp');
const uglify = require('gulp-uglifyjs');

gulp.task('min', () => {
  const stream = gulp.src('dist/moe.js')
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
