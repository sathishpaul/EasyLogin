var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('styles',function() {

  //Copy sweet alert from node-modules
  gulp.src('node_modules/sweetalert/dist/sweetalert.css')
    .pipe(gulp.dest('build/css'));

  gulp.src('css/**.*')
    .pipe(gulp.dest('build/css'))
    .pipe(reload({stream:true}))
});

gulp.task('images',function(){
  gulp.src('images/**')
    .pipe(gulp.dest('./build/images'))
});

gulp.task('copyLibs', function() {
  gulp.src('js/lib/**.*')
    .pipe(gulp.dest('build/libs'))
});

gulp.task('copyTopLevelItems', function() {
  gulp.src(['doLogin.js', 'index.html', 'manifest.json'])
    .pipe(gulp.dest('build'));
});

/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
    browserSync({
        //we need to disable clicks and forms for when we test multiple rooms
        server: {},
        browser: "google chrome",
        middleware : [ historyApiFallback() ],
        ghostMode: false
    });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: ['./js/' + file],
    debug : true,
    transform:  [babelify.configure({stage : 0 })]
  };

  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./build/'))
      // If you also want to uglify it
       .pipe(buffer())
       .pipe(uglify())
      // .pipe(rename('app.min.js'))
       .pipe(gulp.dest('./build'))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('scripts', function() {
  return buildScript('app.js', false); // this will run once because we set watch to false
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['images','styles','scripts','browser-sync'], function() {
  gulp.watch('css/**/*', ['styles']); // gulp watch for stylus changes
  return buildScript('app.js', true); // browserify watch for JS changes
});

gulp.task('package', ['images', 'styles', 'copyLibs', 'copyTopLevelItems', 'scripts']);