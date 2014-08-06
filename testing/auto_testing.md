Auto Running Mocha Chai Tests with Grunt and Grunt Watch
=========================================================
Testing with mocha and chai is great but having to find the command line
and run `npm test` becomes tedious and what's programming for if not
to make tasks on the computer less tedious? This section builds upon the previous
section on <a href="testing/getting_started_with_mocha_and_chai.html">mocha and chai</a>.

The first step in creating an auto run test suite is to install a task runner. I
prefer <a href="http://gruntjs.com/">Grunt</a> so that's what I'll describe. Frist
install the grunt command line tools globaly. `npm install -g grunt-cli`. Next grunt
needs to be a dev dependency for the app. `grunt install --save-dev grunt`. Finally,
a pluggin for running mocha test and the watch pluggin need to be installed.
`grunt install --save-dev grunt-simple-mocha grunt-contrib-watch`

Now that all the dependencies are installed our project needs a grunt file that can
run the tests when any of the javascript file change or any other files for that matter.
Create a file name Gruntfile.js in the root of the project that contains the following.
```javascript
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    simplemocha: {
      test: {
        src: ['test/unit/**/*_test.js']
      }
    },

    watch: {
      test: {
        files: ['test/unit/**/*_test.js', 'app/**/*.js'],
        tasks: ['simplemocha']
      }
    }
  });

  grunt.registerTask('autotest', ['simplemocha', 'watch:test']);
}
```
This grunt first pulls in both the simple mocha and grunt watch pacakges and adds them to grunt.
In the simplemocha task the src array dictates which files should be tested. Adding another element
to this will tell mocha to attempt to run that file as a mocha test when the simplemocha grunt task
is run. This portion of the text does something similar to the npm test task but it allows execution
from within the gruntfile. The watch task is what actually allows test to be autorun. The sub tasks
can be named anything and they contain a files array that contains all of the files that should be
watched for changes and the tasks array which contains all of the tasks that should be run when any
of those files change. A gruntfile can run multiple watch tasks at once so it's possible to restart
the server when the server code changes and re build assets when they change for example. It can 
also run acceptance or unit tests based on specific changes in files. The final part of the gruntfile
is the command that will be run before starting development. When the command `grunt autotest` is entered
from the root of the directory it will first run simplemocha then watch for changes on both the test files
and any js files contained in a currently non existant app directory.
