var gulp 		= require('gulp'),
	del 		= require('del'),
	jeet        = require('jeet'),
	gulpif 		= require("gulp-if"),
	stylus 		= require('gulp-stylus'),
	uglify      = require('gulp-uglify'),
	concat      = require('gulp-concat'),
	plumber     = require('gulp-plumber'),
	imagemin    = require('gulp-imagemin'),
	config 		= require('./gulp.config')(),
	spritesmith = require("gulp-spritesmith"),
	prefixer    = require('autoprefixer-stylus'),
	browserSync = require('browser-sync').create();

// Uglify & Concat JS
gulp.task('js', function () {
	// del('./src/js/main.js');

    return gulp.src(['./src/js/vivadecora.js', './src/js/controllers/**/*.js' ])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js/'));
});

// Compile Stylus
gulp.task('stylus', function () {
    return gulp.src(config.styles + 'styles.styl')
    .pipe(plumber())
    .pipe(stylus({
    	use:[jeet(), prefixer()],
      	//compress: true
    }))
    .pipe(gulp.dest(config.styles));
});

// Minify images
gulp.task('imagemin', function () {
    return gulp.src(config.img + '/**/*')
        .pipe(plumber())
        .pipe(cache(imagemin({
        	optimizationLevel: 3,
        	progressive: true,
        	interlaced: true })))
        .pipe(gulp.dest(config.img));
});

// Create Sprites
gulp.task('sprites', function () {
	return gulp.src(config.img + '*.png')
		.pipe(spritesmith({
		    destImg: config.img + 'sprite.png',
		    destCSS: config.img + 'sprite.css'
		}));
})

// Reload Browsers
gulp.task('browser-sync', function () {
	var files = [
		'src/**/*.html',
		'src/styles/**/*.css',
		'src/js/**/*.js'
	];

	browserSync.init(files, {
    	open: false,
		server: {
		 baseDir: config.src
		}
	});

	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/styles/**/*.styl', ['stylus']);
	gulp.watch(files).on('change', browserSync.reload);
});

// Distribution task
gulp.task('dist', function () {
	del('dist');
	gulp.src(['src/img/**/*']).pipe(gulp.dest('dist/img/'));
	gulp.src(['src/js/main.js']).pipe(gulp.dest('dist/js/'));
	gulp.src(['src/styles/*.css']).pipe(gulp.dest('dist/styles/'));
	gulp.src(['src/**/*.html', 'src/**/*.txt']).pipe(gulp.dest('dist/'));
});

gulp.task('server', ['browser-sync']);
gulp.task('default', ['js', 'stylus', 'imagemin', 'dist'])
