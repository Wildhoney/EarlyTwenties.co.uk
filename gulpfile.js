(function() {

    var JS_FILES      = ['public/js/App.js', 'public/js/**/*.js'],
        SASS_FILES    = ['public/scss/default.scss', 'public/scss/**/*.scss'],
        LIBRARY_FILES = ['public/vendor/angular/angular.js', 'public/vendor/mousetrap/mousetrap.js'];

    var gulp        = require('gulp'),
        uglify      = require('gulp-uglify'),
        sass        = require('gulp-sass'),
        rename      = require('gulp-rename'),
        concat      = require('gulp-concat'),
        jshint      = require('gulp-jshint'),
        processhtml = require('gulp-processhtml');

    gulp.task('js', function() {

        return gulp.src([].concat(LIBRARY_FILES, JS_FILES))
                   .pipe(uglify())
                   .pipe(concat('all.js'))
                   .pipe(rename('earlytwenties.js'))
                   .pipe(gulp.dest('public/build'));

    });

    gulp.task('hint', function() {

        return gulp.src(JS_FILES)
                   .pipe(jshint('.jshintrc'))
                   .pipe(jshint.reporter('default'));

    });

    gulp.task('sass', function() {

        return gulp.src(SASS_FILES[0])
                   .pipe(sass())
                   .pipe(rename('earlytwenties.css'))
                   .pipe(gulp.dest('public/build'));

    });

    gulp.task('html', function() {

        return gulp.src('public/index.html')
                   .pipe(processhtml())
                   .pipe(gulp.dest('public'));

    });

    gulp.task('test', ['hint']);

    gulp.task('build-dev', ['js', 'sass']);
    gulp.task('build-prod', ['html', 'js', 'sass']);
    gulp.task('default', ['test', 'build-dev']);

    gulp.task('watch', function() {
        gulp.watch([].concat(JS_FILES, SASS_FILES), ['build-dev']);
    });

})();