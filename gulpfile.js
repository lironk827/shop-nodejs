//copy file to folder assets 
var gulp = require('gulp');
gulp.task('copy',function(){
    gulp.src('app.js').pipe(gulp.dest('assets'));
});



// convert scss (sass format for css ) into css file
var sass = require('gulp-sass');
var gutil = require('gulp-util');
gulp.task('sass',function(){
    gulp.src('public/stylesheets/main.scss').pipe(sass({style:'expanded'}))
                               .on('error',gutil.log)
                               .pipe(gulp.dest('assets'));

});

var uglify = require('gulp-uglify');
gulp.task('js',function(){
    gulp.src('jsSources').pipe(uglify())
                         .pipe(concat)
})


gulp.task('watch',function(){
    gulp.watch('app.js',['copy']);
    gulp.watch('scripts/*.js',['js']);
    gulp.watch('styles/main.scss',['sass']);

})

gulp.task('defaule',['copy','js','sass','connect','watch']);