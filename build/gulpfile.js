var gulp       = require('gulp');
var gutil      = require('gulp-util');

//var awspublish  = require('gulp-awspublish');
//var clean       = require('gulp-clean');
//var concat      = require('gulp-concat');
//var exec        = require('gulp-exec');
var fs          = require('fs');
//var gulpif      = require('gulp-if');
//var header      = require('gulp-header');
//var jshint      = require('gulp-jshint');
//var jsValidate  = require('gulp-jsvalidate');
var less        = require('gulp-less');
var livereload  = require('gulp-livereload');
var minifycss   = require('gulp-minify-css');
//var path        = require('path');
var plumber     = require('gulp-plumber');
var replace     = require('gulp-replace');
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
});

gulp.task('copy', function () {
  
  var dist = '../_mht/';

  gulp.src(['../**','!.*','!../build/**','!../less/**','!../bower_components/modernizr/test/**','!../_mht/**'])
  .pipe(gulp.dest(dist));

  gulp.src('../html/*.html')
  .pipe(gulp.dest('../'));

});

/*
* the html-replace task
* --------------------
*/
gulp.task('html-replace',function(){

  var arr = [
    'js/app.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-pointerevents/dist/jquery-pointerevents.js',
    'bower_components/ua-parser-js/src/ua-parser.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/modernizr/feature-detects/css-pointerevents.js'
  ];

  var files = [];

  var len = arr.length;
  for(var ii = 0; ii < len; ii++){
    var cur = arr[ii];
    var path = '../'+cur;
    if(fs.existsSync(path)){
      var data = fs.readFileSync(path);
      files.push({file:cur,data:data});
    }
  }

  console.log(files.length);
  console.log(files[0].file);

  gulp.src('../*.html')
  .pipe(replace('{{'+files[0].file+'}}', '<script type="text/javascript">try{ '+files[0].data+'}catch(err){}</script>'))
  .pipe(replace('{{'+files[1].file+'}}', '<script type="text/javascript">try{ '+files[1].data+'}catch(err){}</script>'))
  .pipe(replace('{{'+files[2].file+'}}', '<script type="text/javascript">try{ '+files[2].data+'}catch(err){}</script>'))
  .pipe(replace('{{'+files[3].file+'}}', '<script type="text/javascript">try{ '+files[3].data+'}catch(err){}</script>'))
  .pipe(replace('{{'+files[4].file+'}}', '<script type="text/javascript">try{ '+files[4].data+'}catch(err){}</script>'))
  .pipe(replace('{{'+files[5].file+'}}', '<script type="text/javascript">try{ '+files[5].data+'}catch(err){}</script>'))

  .pipe(gulp.dest('../'));


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

gulp.task('default', ['less','copy','html-replace']);
