var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch');
    concat = require('gulp-concat');
    notify = require('gulp-notify');
    plumber = require('gulp-plumber');
    stripDebug = require('gulp-strip-debug');

gulp.task('styles', function() {
    return gulp.src('./scss/*.scss')
        .pipe(plumber())
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))       
        .pipe(rename({suffix:'.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./css'))
        .pipe(notify({message: "Styles task completed."}));
});

gulp.task('scripts', function() {
    return gulp.src(['./js/vendor/*.js','./js/main.js','./js/partials/*.js'])
        .pipe(concat('all.js'))
        .pipe(rename({suffix: '.min'}))
        // .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(notify({message: "Scripts task completed."}));
});

gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', ['styles']);
    gulp.watch('./scss/partials/*.scss', ['styles']);
    gulp.watch('./scss/partials/theme/*.scss', ['styles']);

    gulp.watch('./js/main.js', ['scripts']);
    gulp.watch('./js/partials/*.js', ['scripts']);
    gulp.watch('./js/vendor/*.js', ['scripts']);
})

gulp.task('default', function() {
    gulp.start('styles', 'scripts');
});