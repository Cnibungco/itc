'use strict';

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	connect = require('gulp-connect'),
	nodemon = require('gulp-nodemon');

var SCSS_SRC = 'scss/**/*.scss';
var CSS_DIR = 'css/';
var SERVER_FILE = 'server/server.js';
var JS_SRC = 'script/**/*.js';

gulp.task('styles',function () {
	return sass(SCSS_SRC)
	 .pipe(gulp.dest(CSS_DIR))
	 .pipe(connect.reload());
});
gulp.task('html',function(){
	gulp.src("**/*.html")
	 .pipe(connect.reload());
});
gulp.task('script',function(){
	gulp.src(JS_SRC)
	 .pipe(connect.reload());
})
gulp.task('watch',function(){
	gulp.watch(JS_SRC, ['scripts']);
	gulp.watch(SCSS_SRC, ['styles']);
	gulp.watch("**/*.html", ['html']);
});
gulp.task('start', function () {
  nodemon({
  	script: SERVER_FILE,
  	ext: 'js',
  	env: { 'NODE_ENV': 'development' }
  })
});
gulp.task("connect",function(){
	connect.server({
		livereload: true
	});
});
gulp.task('default', ['styles','watch','connect','start']);