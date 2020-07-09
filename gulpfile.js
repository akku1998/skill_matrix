const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sassGlob = require('gulp-sass-glob');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');


function clean() {
  return del([ 'assets' ]);
}

const paths = {
  styles: {
    src: 'scss/**/*.scss',
    dest: 'css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'assets/js/'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
}

const build = gulp.series(clean, gulp.parallel(styles));

exports.clean = clean;
exports.styles = styles;
exports.watch = watch;
exports.build = build;

exports.default = build;