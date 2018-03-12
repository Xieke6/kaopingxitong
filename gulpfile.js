var gulp = require('gulp')
var minifycss = require('gulp-minify-css')
var connect = require('gulp-connect')
var notify = require('gulp-notify')
var sass = require('gulp-ruby-sass')

//sass--css
gulp.task('sass', function() {
    return sass('sass/*')
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        // save the compressed files to dest folder
        .pipe(gulp.dest('css/'))
        .pipe(notify({message:"css is modified"}))
        .pipe(connect.reload());
});

//css
gulp.task('css',function(){
    gulp.src('css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
})


//html
gulp.task('html',function(){
    gulp.src('*.html')
        .pipe(connect.reload())
        .pipe(notify({message:"html is modified"}))
})
//js



//监视文件改动  wacth(文件，[任务1，任务2，。。。])
gulp.task('auto',function(){
    //表示根目录下的html文件一旦有改动，就立即执行html任务
    gulp.watch('*.html',['html'])
    gulp.watch('sass/*.scss',['sass','css'])
})

gulp.task('connect',function(){
    connect.server({
        root: './',
        ip: "localhost",
        port: '8090',
        livereload : true
    })
})

gulp.task('default',['css','connect','html','auto','sass'])