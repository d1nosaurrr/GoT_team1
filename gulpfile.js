const {series, parallel, watch, src, dest} = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const minifyjs = require('gulp-js-minify');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const minifyInline = require('gulp-minify-inline');
const concat = require('gulp-concat');

const cleanDist = () => {
    return src('dist/', {read: false, allowEmpty: true})
        .pipe(clean());
};

const serv = () => {
    browserSync.init({
        server: {
            baseDir: "./",
        },
    });
};

const bsReload = (cb) => {
    browserSync.reload();
    cb();
};

const styles = () => {
    return src("./src/scss/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe( cleanCSS( {
            inline: ['none']
        }  )  )
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest("./dist/styles/"))
        .pipe(browserSync.stream());
};
const js = () => {
    return src("./src/js/*.js")
        .pipe(concat('script.js'))
        .pipe(minifyInline())
        .pipe(minifyjs())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest("./dist/js/"))
        .pipe(browserSync.stream());
};
const img = () => {
    return src("./src/img/**/*.+(png|jpg|gif|svg|json|ico|xml)")
        .pipe(imagemin())
        .pipe(dest('./dist/img'))
        .pipe(browserSync.stream());
};

const watcher = (cb) => {
    watch("./index.html", bsReload);
    watch("./src/scss/*.scss", styles);
    watch("./src/js/index.js", js);
    watch("./src/img/*", img);
    cb();
};

exports.dev = parallel(serv, watcher, series(styles, js, img));
exports.build = series(cleanDist, styles, js, img);
exports.styles = styles;