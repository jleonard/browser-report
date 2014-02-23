var gulp       = require('gulp');
var gutil      = require('gulp-util');

//var awspublish  = require('gulp-awspublish');
//var clean       = require('gulp-clean');
//var concat      = require('gulp-concat');
//var exec        = require('gulp-exec');
//var fs          = require('fs');
//var gulpif      = require('gulp-if');
//var header      = require('gulp-header');
//var jshint      = require('gulp-jshint');
//var jsValidate  = require('gulp-jsvalidate');
var less        = require('gulp-less');
var livereload  = require('gulp-livereload');
var minifycss   = require('gulp-minify-css');
//var path        = require('path');
var plumber     = require('gulp-plumber');
//var rename      = require("gulp-rename");
//var runSequence = require('run-sequence');
//var s3          = require("gulp-s3");
//var stylish     = require('jshint-stylish');
//var uglify      = require('gulp-uglify');


/*
* the less task
* --------------------
* compiles .less
* checks for compilation errors
* minifies the css output
* copies css to the dist folder
* calls the livereload server
*/
gulp.task('less', function () {
  
  var dist = '../';

  gulp.src('../less/app.less')
  .pipe(plumber(
    { errorHandler: function (error) {
      console.log(error.toString());
      notDeployable = true;
    }
    }
  ))
  .pipe(less())
  .pipe(minifycss())
  .pipe(gulp.dest(dist+'css'))
  .pipe(livereload())
});

/*
* the watch task
* --------------------
* monitors key source folders and calls
* the appropriate task on change
*/
gulp.task('watch', function () {
  gulp.watch('../less/**/*.less', ['less']);
});

gulp.task('default', ['less']);
