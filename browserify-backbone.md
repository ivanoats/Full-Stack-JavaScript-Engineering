# Browserify Based Backbone App with Express REST API

Starting point: https://github.com/ivanoats/notes/tree/49eee7ae639e7d24208942b8044c3ca0f7e3d3e3

To get to starting point:
`git clone ivanoats/notes` (or [URL from github](https://www.github.com/ivanoats/notes)
 if you're not using [hub](https://www.github.com/github/hub).)
```
git checkout 49eee7ae63
git checkout -b start
```

# Karma

[Karma](http://karma-runner.github.io) is our test runner for front-end testing.

Install karma and the plugins we use:

```
npm install -g karma-cli
npm install karma karma-browserify --save-dev
npm install karma-mocha karma-chrome-launcher karma-firefox-launcher karma-phantomjs-launcher --save-dev
```

Initialize the Karma configuration:

```
karma init test/karma.conf.js
```

* Press `tab` to select mocha as the testing framework.
  * Choose `no` to use Require.js


* Capture any browsers automatically? Sure, Chrome, or Firefox, PhantomJS, Safari, etc.
* What is the location of your source and test files?

```
app/js/*.js
test/browser/*.js

```

* Should any of the files included by the previous patterns be excluded ? (empty string)
* Do you want Karma to watch all the files and run the tests on change ? Yes
* You should see something like `Config file generated at "/Users/ivan/dev/notes/test/karma.conf.js"`
* add in 'browserify' as an extra element to the array in the frameworks line

Here's my generated karma config file:
```javascript
// Karma configuration
// Generated on Wed May 21 2014 18:22:19 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','browserify'],


    // list of files / patterns to load in the browser
    files: [
      'app/js/*.js',
      'test/browser/*.js'
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'PhantomJS', 'Safari'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

```
