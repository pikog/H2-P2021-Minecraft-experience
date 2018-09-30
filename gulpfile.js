const gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minify = require('gulp-minify'),
    cleanCSS = require('gulp-clean-css')


gulp.task('build', () => 
{
    gulp.src('assets/+(fonts|obj|sounds|images|favicon)/**/*')
        .pipe(gulp.dest('dist/assets'))
    
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', minify({ext:{min:'.js'}, noSource: true})))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('dist'))
})