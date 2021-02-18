const {series, src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades
const autopreFixer = require('autopreFixer');
const postcss = require('gulp-postcss');

//FUNCION sass
const paths = {
	imagenes: 'src/img/**/*',
	scss: 'src/scss/**/*.scss',
	js: 'src/js/**/*.js'
}

function css (  ){
	return src(paths.scss)
		.pipe( sass({
			outputStyle: 'expand'
		}))
		.pipe(postcss(autoprefixer()))
		.pipe( dest('./build/css') )
}

function minificarcss(){
	return src(paths.scss)
		.pipe( sass({
			outputStyle: 'compressed'
		}))
		.pipe( dest('./build/css') )
}

function javaScript(){
	return src(paths.js)
		.pipe(concat('bundle.js'))
		.pipe(dest('build/js'))
}

function imagenes(){
	return src(paths.imagenes)
		.pipe( imagemin())
		.pipe(dest('./build/img'))
		.pipe(notify({message: 'Imagen Minnificada'}))
}

function versionWebp(){
	return src(paths.imagenes)
		.pipe( webp())
		.pipe(dest('./build/img'))
		.pipe(notify({message: 'Version webp lista :)'}))
}

function watchArchivos(){
	watch( paths.scss, css );
	watch(paths.js, javaScript);
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javaScript, imagenes,versionWebp, watchArchivos);