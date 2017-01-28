var gulp = require('gulp');

var compilerPackage = require('google-closure-compiler');
var closureCompiler = compilerPackage.gulp();
 
gulp.task('js-compile', function () {
  return closureCompiler({
        js: './dist/bhmc.js',
        // externs: compilerPackage.compiler.CONTRIB_PATH + '/externs/jquery-1.9.js',
        compilation_level: 'SIMPLE',
        warning_level: 'VERBOSE',
        language_in: 'ECMASCRIPT6_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
        output_wrapper: '(function(){\n%output%\n}).call(this)',
        js_output_file: 'bhmc.min.js'
      })
      .src() // needed to force the plugin to run without gulp.src 
      .pipe(gulp.dest('./dist'));
});

var uglify = require('gulp-uglify');
var pump = require('pump');
 
gulp.task('compress', function (cb) {
  pump([
        gulp.src('./dist/bhmc.js'),
        uglify(),
        gulp.dest('./dist')
    ],
    cb
  );
});