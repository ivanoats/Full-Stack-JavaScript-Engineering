# Acceptance Testing with CasperJS

Acceptance testing is also known as "Outside-in", or "black-box" testing. It
tests a system just like a web browser does. Except, instead of a person clicking
on a web browser, a "headless" browser operates in the command line, a bit more
behind the scenes. 

![JS Acceptance Testing Landscape](images/js_acceptance_testing_landscape.jpg) 

There are many options for acceptance testing, but we will be using one called
[CasperJS](http://casperjs.org).

## Write our first acceptance test

Let's just test to see if the home page is loading o.k., and that the title tag
and H1 tags are what we expect. Here's the code, it goes in
`test/acceptance/home_page_test.js`:

BTW, if you want to make a new directory multiple levels deep, you can use:
`mkdir -p test/acceptance` from your project's home directory.

```javascript
'use strict';
/*global casper*/

casper.test.begin('home page', 3, function suite(test) {

  casper.start('http://localhost:3000/', function() {
    test.assertHttpStatus(200);
  });

  casper.then(function(){
    test.assertTitle('Hello World Express', 'title is Hello World Express');
  });

  casper.then(function() {
    test.assertSelectorHasText('h1','Hello World');
  });

  casper.run(function(){
    test.done();
  });

});
```

So, we have three assertions that we expect to be true. The status should be 200
OK, the title should be "Hello World Express", and the h1 should include the text
"Hello World".

## Run our acceptance tests

To run our acceptance test we'll need to make sure to start the express server.
We will use a grunt plugin to automate this.

You can do this on your personal portfolio site, or your hello world express code.

#### Hook up Grunt-Express-Server

From the command line:
`npm install grunt-express-server --save-dev`

And in Gruntfile.js add:
`grunt.loadNpmTasks('grunt-express-server');`

#### Install and Configure CasperJS and PhantomJS

Install Casper and PhantomJS globally, and Grunt integration locally

```
npm install -g phantomjs casperjs
npm install grunt-casper --save-dev
npm install grunt-express-server --save-dev
```

Edit your `Gruntfile.js` to include tasks like these below:

```javascript
'use strict';
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-casper');

  grunt.initConfig({
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'server.js'
        }
      }
    },
    casper: {
      acceptance : {
        options : {
          test : true,
        },
        files : {
          'test/acceptance/casper-results.xml' : ['test/acceptance/*_test.js']
        }
      }
    }
  });

  grunt.registerTask('server', [ 'jshint', 'express:dev' ]);
  grunt.registerTask('test',['express:dev','casper']);
  grunt.registerTask('default', ['jshint', 'test']);

};

```

* I added a `server` task that runs the express server after JSHint passes.
* I added a `test` task that sets up the express server in dev mode, and then runs
the casper tests.
* I set the default task to run JSHint and then the test task.

## Try it out

Now try `grunt test` from the command line and see what happens&hellip;




