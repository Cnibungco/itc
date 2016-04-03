'use strict';

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	nodemon = require('gulp-nodemon'),
	install = require('gulp-install'),
	lr = require('gulp-livereload');

var PUBLIC_DIR = 'public_html/';
var SCSS_SRC = PUBLIC_DIR + 'assets/scss/**/*.scss';
var CSS_DIR = PUBLIC_DIR + 'assets/css/';
var SERVER_DIR = 'server/**/*.js';
var SERVER_FILE = 'server/server.js';
var JS_SRC = PUBLIC_DIR + '**/*.js';

gulp.task('styles',function () {
	return sass(SCSS_SRC)
	 .pipe(gulp.dest(CSS_DIR))
	 .pipe(lr());
});
gulp.task('html',function(){
	gulp.src(PUBLIC_DIR + "/**/*.html")
		.pipe(lr());
});
gulp.task('scripts',function(){
	gulp.src(JS_SRC)
	.pipe(lr());
});
gulp.task('watch',function(){
	lr.listen();
	gulp.watch(JS_SRC, ['scripts']);
	gulp.watch(SCSS_SRC, ['styles']);
	gulp.watch("**/*.html", ['html']);
});
gulp.task('start', function () {
  nodemon({
  	script: SERVER_FILE,
  	ext: 'js',
  	env: { 'NODE_ENV': 'development' },
  	watch: [SERVER_DIR]
  })
});
gulp.task("install",function(){
	gulp.src(['./package.json2'])
	 .pipe(install());
});

gulp.task('default', ['install','styles','watch','start']);