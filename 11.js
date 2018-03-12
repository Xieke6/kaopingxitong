var gulp = require('gulp');    // Get Gulp
var uglify = require('gulp-uglify');    // Get uglify module
var minifyCss = require('gulp-minify-css');    // Get minify-css module
var imageMin = require('gulp-imagemin');    // Get imagemin module
var less = require('gulp-less');    // Get less module
var sass = require('gulp-ruby-sass');    // Get ruby-sass module
var jshint = require('gulp-jshint');    // Get jshint module
var notify = require('gulp-notify');    // Get notify module
var connect = require('gulp-connect');  //auto refresh component

// Compile less files, run 'gulp less' in command line
gulp.task('less', function() {
    // set less source folder
    gulp.src('less/**/*.less')
    // compile less to css
        .pipe(less())
        // save the compiled files to dest folder
        .pipe(gulp.dest('css'));
});

// Compile sass files, run 'gulp sass' in command line
gulp.task('sass', function() {
    return sass('sass/')
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        // save the compressed files to dest folder
        .pipe(gulp.dest('css'));
});

// Compress JS files, run 'gulp script' in command line
gulp.task('script', function() {
    // set JS source folder
    gulp.src('js/**/*.js')
    // Check the JS code convention
        .pipe(jshint())
        // compress files
        .pipe(uglify())
        // save the compressed files to dest folder
        .pipe(gulp.dest('dist/js'))
        // Sent notification
        .pipe(notify({ message: 'script task complete' }));
});

// Compress CSS files, run 'gulp css' in command line
gulp.task('css', function() {
    // set CSS source folder
    gulp.src('css/**/*.css')
    // compress files
        .pipe(minifyCss())
        // save the compressed files to dest folder
        .pipe(gulp.dest('dist/css'));
});

// Compress images, run 'gulp image' in command line
gulp.task('img', function() {
    // set image folder
    gulp.src('images/**/*.*')
    // Compress images
        .pipe(imageMin({
            progressive: true
        }))
        // save the compressed files to dest folder
        .pipe(gulp.dest('dist/img'));
});

gulp.task('connect',function(){
    connect.server({
        root:'./',
        ip:'localhost',
        livereload:true
    })
})
gulp.task('html', function(){
    console.log("html is modfied~")
    gulp.src('templates/*.html')
        .pipe(connect.reload());
});

// Listening the changes, run 'gulp auto' in command line
gulp.task('auto', function() {
    // Listen to the changes in less source folder, run 'less' task when change happens
    gulp.watch('less/**/*.less', ['less']);
    // Listen to the changes in sass source folder, run 'sass' task when change happens
    gulp.watch('sass/**/*.scss', ['sass']);
    // Listen to the changes in JS source folder, run 'script' task when change happens
    gulp.watch('js/**/*.js', ['script']);
    // Listen to the changes in CSS source folder, run 'css' task when change happens
    gulp.watch('css/**/*.css', ['css']);
    // Listen to the changes in image folder, run 'image' task when change happens
    gulp.watch('image/**/*.*', ['img']);
    // Listen to the changes in templates source folder, log event when change happens
    gulp.watch('templates/*.html', ['html']);
});
//,function(event){
//  		console.log('Event type: ' + event.type); // added, changed, or deleted
//  		console.log('Event path: ' + event.path); // The path of the modified file
//  }
// Define the default task, run 'gulp' in command line, it will run both 'script' and 'auto' tasks
gulp.task('default', ['less', 'sass', 'script', 'css', 'img', 'connect', 'auto']);


