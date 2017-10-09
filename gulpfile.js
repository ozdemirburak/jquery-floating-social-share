var gulp = require('gulp'),
  concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  rename = require('gulp-rename');

var src = 'src/', dist = 'dist/';

gulp.task('compile-css', function () {
  return gulp.src(src + '/less/main.less')
    .pipe(less())
    .pipe(rename('jquery.floating-social-share.css'))
    .pipe(gulp.dest(src));
});

gulp.task('minify-css', function() {
  return gulp.src(src + 'jquery.floating-social-share.css')
    .pipe(concat('jquery.floating-social-share.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(dist));
});

gulp.task('minify-js', function() {
  return gulp.src(src + 'jquery.floating-social-share.js')
    .pipe(concat('jquery.floating-social-share.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(dist));
});

gulp.task('default', function() {
  gulp.run('minify-js', 'compile-css', 'minify-css');
})
