var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var less = require('gulp-less')
var sourcemaps = require('gulp-sourcemaps')
var path = require('path')

var paths = {
  scripts: ['assets/js/**/*.js'],
  less: ['assets/less/**/*.less']
}

gulp.task('less', function () {
  return gulp.src(paths.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'assets', 'less') ]
    }))
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('watch', function() {
  gulp.watch(paths.less, ['less'])
})

gulp.task('default', ['watch'])
