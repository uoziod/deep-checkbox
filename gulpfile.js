var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function () {
  gulp.src('script/jquery.deepcheckbox.js')
    .pipe(uglify({
      preserveComments: 'all'
    }))
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(gulp.dest('script'))
});
