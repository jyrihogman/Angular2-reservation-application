var gulp = require('gulp');
var less = require('gulp-less');
var list = require('gulp-task-listing');
var path = require('path');
var requireDir = require('require-dir');
var moment = require('moment');
const ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript'),
  outFile: 'app.js'
});

gulp.task('default', function() {
});


gulp.task('tscompile', function () {
  var tsResult = gulp.src('./app/**/*.ts')
                     .pipe(ts(tsProject));

  return tsResult.js.pipe(gulp.dest('./dist'));
});

gulp.task('app-bundle', function () {
  var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript'),
    outFile: 'app.js'
  });

  var tsResult = gulp.src('app/**/*.ts')
                   .pipe(ts(tsProject));

  return tsResult.js.pipe(concat('app.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest('./dist'));
});