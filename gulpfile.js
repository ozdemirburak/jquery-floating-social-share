var gulp = require('gulp'),
  concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  rename = require('gulp-rename');

var src = 'src/', dist = 'dist/';

function compileCss() {
  return gulp.src(src + '/less/main.less')
    .pipe(less())
    .pipe(rename('jquery.floating-social-share.css'))
    .pipe(gulp.dest(src));
};

function minifyCss() {
  return gulp.src(src + 'jquery.floating-social-share.css')
    .pipe(concat('jquery.floating-social-share.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(dist));
};

function minifyJs() {
  return gulp.src(src + 'jquery.floating-social-share.js')
    .pipe(concat('jquery.floating-social-share.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(dist));
};

var build = gulp.series(compileCss, minifyCss, minifyJs);

exports.compileCss = compileCss;
exports.minifyCss = minifyCss;
exports.minifyJs = minifyJs;
exports.build = build;
exports.default = build;
