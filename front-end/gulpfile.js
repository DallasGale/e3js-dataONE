'use strict';

const babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    cleanCSS = require('gulp-clean-css'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    streamqueue = require('streamqueue'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

const  jsDest = '../js/';

gulp.task('scripts', () => {
    return streamqueue({ objectMode: true },
        gulp.src('./js/vendor/*.js'),
        gulp.src('node_modules/bootstrap/dist/js/bootstrap.js'),
        gulp.src('./js/*.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts:watch', () => {
    gulp.watch('./js/**/*.js', ['scripts']);
});

gulp.task('css', () => {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../css/vendor/'))
});

gulp.task('sass', () => {
    return gulp.src('./styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../css/'));
});

gulp.task('sass:watch', () => {
    gulp.watch('./styles/**/*.scss', ['sass']);
});


gulp.task('images', () => {
    return gulp.src('assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../images'))
});

gulp.task('images:watch', () => {
    gulp.watch('./assets/images/**/*', ['images']);
});

gulp.task('default', ['css', 'sass', 'sass:watch', 'scripts', 'scripts:watch', 'images', 'images:watch']);
