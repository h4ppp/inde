const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const del = require('del');

// Таск для сборки Gulp файлов
gulp.task('pug', function(callback) {
	return gulp.src('./src/pug/pages/**/*.pug')
		.pipe( pug({
			pretty: true
		}) )
		.pipe( gulp.dest('./build/') )
		.pipe( browserSync.stream() )
	callback();
});

// Таск для компиляции SASS в CSS
gulp.task('sass', function(callback) {
	return gulp.src('./src/sass/main.sass')
		.pipe( sass() )
		.pipe( autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}) )
		.pipe( gulp.dest('./build/css/') )
		.pipe( browserSync.stream() )
	callback();
});


// Слежение за HTML и CSS и обновление браузера
gulp.task('watch', function() {

	// Следим за картинками и скриптами и обновляем браузер
	watch( ['./build/js/**/*.*', './build/img/**/*.*'], gulp.parallel(browserSync.reload) );

	// Запуск слежения и компиляции SASS с задержкой
	watch('./src/sass/**/*.sass', function(){
		setTimeout( gulp.parallel('sass'), 500 )
	})

	// Слежение за PUG и сборка
	watch('./src/pug/**/*.pug', gulp.parallel('pug'))

});

// Задача для старта сервера из папки app
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}, 
		notify: false
	})
});

gulp.task('clean:build', function() {
	return del('./build/css/main.css', './build/*.html')
});

// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
gulp.task(
		'default', 
		gulp.series( 
			gulp.parallel('clean:build'),
			gulp.parallel('sass', 'pug'), 
			gulp.parallel('server', 'watch'), 
			)
	);
