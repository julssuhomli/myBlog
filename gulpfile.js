var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');



//html-compiled
gulp.task('pug', function buildHTML() {
  return gulp.src('build/index.pug')
  .pipe(pug({pretty:true}))
  .pipe(gulp.dest('dist/'))
});



//css-compiled
gulp.task('stylus', function () {
  return gulp.src('build/styles.styl')
    .pipe(stylus({pretty:true}))
    .pipe(gulp.dest('dist'));
});



//prefixer
gulp.task('autoprefixer', () =>
    gulp.src('dist/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);



//browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist",
        }
    });
});



//watcher
gulp.task('watcher', function () {
    gulp.watch(['build/*.pug', 'build/templates/*.pug'],['pug']);
    gulp.watch(['build/*.styl', 'build/stylesheets/*.styl'],['stylus']);
});


//default

gulp.task('default',['pug', 'stylus', 'watcher', 'browser-sync'])
