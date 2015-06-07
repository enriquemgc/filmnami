'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var node;



// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
});


// TASKS --------------------------------------------------

// reload node
gulp.task('node', function() {
    // if node is already running
    if (node) node.kill();
    // run node
    node = spawn('node', ['app.js'], {stdio: 'inherit'});
    // log on close
    node.on('close', function (code) {
      if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
      }
    });
});

// watch for changes in node related files. Reload node if needed
gulp.task('default', ['node'], function() {

  // files to watch
  gulp.watch([
    'backend/*',  // any file in backend folder
    'backend/**/*.js',  // js files in directories inside backend 
  ], ['node']); // tasks to run on file change

});