let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;

let input_js = ['js/jquery-3.3.1.slim.js', 'js/bootstrap.js', 'js/popper.js'];

gulp.task('sass', function () {
	return gulp.src('./scss/styles.scss')
		.pipe(sass())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('./css/'));
});

gulp.task('minify-css', () => {
	return gulp.src('css/styles.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./css/'));
});

gulp.task('styles', gulp.series('sass', 'minify-css'));

gulp.task('watch', function () {
	return gulp.watch('./scss/**/*.scss', gulp.series('styles'));
});

gulp.task('combine', function () {
	return gulp.src(input_js)
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./js/'));
});

gulp.task('uglify-js', function () {
	return gulp.src('js/all.js')
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./js/'));
});

gulp.task('watch-js', function () {
	return gulp.watch(input_js, gulp.series('combine', 'uglify-js'));
})

let indent = require('gulp-indent');

gulp.task('indent', () => {
	return gulp.src('awfulindent.html', '!node_modules')
		.pipe(indent({
			tabs: true,
			amount: 1
		}))
		.pipe(gulp.dest('./whattheplanet'))
}); 
