const { series, parallel, watch, src, dest } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const htmlInclude = require('gulp-file-include');
const minifyjs = require('gulp-js-minify');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const minifyInline = require('gulp-minify-inline');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const cleanDist = () => {
  return src('dist/', { read: false, allowEmpty: true })
    .pipe(clean());
};

const serv = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
};

const bsReload = (cb) => {
  browserSync.reload();
  cb();
};
const html = () => {
  return src('./index.html')
    .pipe(htmlInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());
};
const styles = () => {
  return src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(cleanCSS({
      inline: ['none']
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./dist/styles/'))
    .pipe(browserSync.stream());
};
const js = () => {
  return src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(minifyInline())
    .pipe(minifyjs())
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('./dist/js/'))
    .pipe(browserSync.stream());
};
const img = () => {
  return src('./src/img/**/*.+(png|jpg|gif|json|ico|xml)')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.optipng(),
      imagemin.svgo([
        { cleanupIDs: false },
        { removeUselessDefs: false },
        { removeViewBox: false },
        { minifyStyles: false }
      ])
    ], { verbose: true }))
    .pipe(dest('./dist/img'))
    .pipe(browserSync.stream());
};

const svg = () => {
  return src('./src/img/**/*.svg')
    .pipe(dest('./dist/img'))
    .pipe(browserSync.stream());
};

const fonts = () => {
  return src('./fonts/*')
    .pipe(dest('./dist/fonts'));
};

const watcher = (cb) => {
  watch('./index.html', bsReload);
  watch('./src/scss/*.scss', styles);
  watch('./src/js/*.js', js);
  watch('./src/img/*', img);
  cb();
};

exports.dev = parallel(serv, watcher, series(html, styles, js, img, svg));
exports.build = series(cleanDist, html, styles, js, img, svg, fonts);
exports.styles = styles;