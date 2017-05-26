var gulp = require('gulp'),
    sync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    path = require('path'),
    fs = require('fs');

function versionOf(loc) {
  do {
    try {
      loc = path.resolve(loc, '../');
      let packagePath = path.join(loc, 'package.json');
      let packageSpec = fs.readFileSync(packagePath);
      let packageDef = JSON.parse(packageSpec);
      return packageDef.version;
    } catch (e) {}
  } while (loc.length > 1);
  return '???';
}

function pipeWithVersion(loc) {
  return gulp.src(loc)
    .pipe(rename(path => {
      let version = versionOf(loc);
      path.basename = path.basename.replace('.min', '-' + version + '.min');
      path.basename = path.basename.replace('-min', '-' + version + '.min');
      console.log(path.basename);
    }))
    .pipe(gulp.dest('./src'));
}

gulp.task('serve:prepare:angular', [], () => {
  let p = './node_modules/angular/angular.min.js';
  return pipeWithVersion(p);
});

gulp.task('serve:prepare:angular-resource', [], () => {
  let p = './node_modules/angular-resource/angular-resource.min.js';
  return pipeWithVersion(p);
});

gulp.task('serve:prepare:angular-ui-router', [], () => {
  let p = './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js';
  return pipeWithVersion(p);
});

gulp.task('serve:prepare:pure', [], () => {
  let p = './node_modules/purecss/build/pure-min.css';
  return pipeWithVersion(p);
});

gulp.task('test:prepare:angular-mocks', [], () => {
  gulp.src('./node_modules/angular-mocks/angular-mocks.js')
    .pipe(gulp.dest('./src'));
});

gulp.task('serve:prepare', [
  'serve:prepare:angular',
  'serve:prepare:angular-resource',
  'serve:prepare:angular-ui-router',
  'serve:prepare:pure'
]);

gulp.task('test:prepare', [
  'serve:prepare',
  'test:prepare:angular-mocks'
]);

gulp.task('serve', ['serve:prepare'], () => {
  sync.init({
    server: './src',
    ghostMode: false,
    files: ['./src/**/*.html', './src/**/*.js']
  });
});
