(function() {

    var JS_FILES      = ['public/js/App.js', 'public/js/**/*.js'],
        SASS_FILES    = ['public/scss/default.scss', 'public/scss/**/*.scss'],
        JS_LIBRARIES  = ['public/vendor/angular/angular.js',
                         'public/vendor/mousetrap/mousetrap.js',
                         'public/vendor/filepicker/filepicker.min.js'],
        CSS_LIBRARIES = ['public/vendor/font-awesome/css/font-awesome.css'];

    var gulp         = require('gulp'),
        uglify       = require('gulp-uglify'),
        sass         = require('gulp-sass'),
        rename       = require('gulp-rename'),
        concat       = require('gulp-concat'),
        flatten      = require('gulp-flatten'),
        cssmin       = require('gulp-cssmin'),
        jshint       = require('gulp-jshint'),
        autoprefixer = require('gulp-autoprefixer'),
        processhtml  = require('gulp-processhtml');

    gulp.task('js', function() {

        return gulp.src([].concat(JS_LIBRARIES, JS_FILES))
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

    gulp.task('fonts', function() {

        return gulp.src('public/vendor/font-awesome/fonts/*', { base: '.' })
                   .pipe(flatten())
                   .pipe(gulp.dest('public/fonts'));

    });

    gulp.task('css', ['sass'], function() {

        return gulp.src(CSS_LIBRARIES.concat('public/build/earlytwenties.css'))
                   .pipe(concat('all.css'))
                   .pipe(cssmin())
                   .pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'] }))
                   .pipe(rename('earlytwenties.css'))
                   .pipe(gulp.dest('public/build'));

    });

    gulp.task('html', function() {

        return gulp.src('public/index.html')
                   .pipe(processhtml())
                   .pipe(gulp.dest('public'));

    });

    gulp.task('test', ['hint']);
    gulp.task('build-dev', ['js', 'sass', 'css', 'fonts']);
    gulp.task('build-prod', ['html', 'js', 'sass', 'css', 'fonts']);
    gulp.task('default', ['test', 'build-dev']);

    gulp.task('watch', function() {
        gulp.watch([].concat(JS_FILES, SASS_FILES), ['build-dev']);
    });

})();