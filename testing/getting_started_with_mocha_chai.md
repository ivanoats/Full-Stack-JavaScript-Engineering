Getting Started with Javascript Unit Testing Using Mocha and Chai
=================================================================
There are a lot of different options when it comes to testing Javascript
code. Everthing from headless browsers(a fake browser that simulates popular 
javascript engines) to small unit testing frameworks exist. Testing is further
 complicated by the fact that Javscript has two very different run time environments:
 the browser and the server. The solution that I prefer is a combination of
two libraries, mocha and chai.

<a href="https://visionmedia.github.io/mocha/">Mocha</a> provides the testing framework that allows the programmer to 
describe his or her tests in an almost plain text syntax. It can be run from
the command line, in browser or through a utility like <a href="http://gruntjs.com/">grunt</a> or <a href="http://gulpjs.com/">gulp</a>.
Here's an example of a mocha test:
```javascript
describe("My First Test", function() {
  it("should be true", function(){
    true;
  });
});
```

<a href="http://chaijs.com/">Chai</a> is library that provides various assertions
that provide the actual functionality of the testing framework. It allows the programmer
to make statements like `assert(2,1);` or `expect(1).to.be.eql(1);`. Chai provides a lot
different methods for making assertions and can be used according the programmers personal preference.

When these two tools are combined they create a very flexible and easy to understand testing 
framework that can be used with other tools such as rest interfaces or mocks. I find it easier
to start testing on the server side so I'll go over that code frist. The first step is to create
a new a new directory that all of the code for the testing framework will be contained in. 
`mkdir mocha_chai_test_framework && cd mocha_chai_test_framework` Inside of that directory will be
a package.json file that contains the following:
```javascript
{
  "name" : "mocha-chai-testing-framework",
  "description" : "a simple testing framework using mocha and chai",
  "version" : "0.0.1",
  "dependencies" : {

  },
  "devDependencies" : {

  },
  "scripts" : {
    "test" : "./node_modules/mocha/bin/mocha test/unit/**/*_test.js"
  }
}
```
Of note in this package.json file is the scripts section. In it, a test action is specified.
This action uses the mocha run script located in the node_modules folder of the project. This
allows mocha to only be installed locally instead of in the globaly while still being able to
easily run tests with the command `npm test`. The next step is to actually install mocha and
chai with the command `npm install --save-dev mocha chai`. Mocha and chai are only needed in
in the test/development environment so they're installed with `--save-dev` as opposed to `--save`.

Next mocha needs a test to run. In the package.json test script the folder that mocha looks find
tests in is test/unit and it will run any js files that end in _test in any of that subfolder 
found in that directory. Create the folder with the command `mkdir -p test/unit` the -p flag
tells mkdir to create any parent folders that aren't yet created for the unit directory. The first
we want to run is going to be called, first_test.js (cryptic, I know). Create that file with
the following code:
```javascript
var chai = require('chai');
var assert = chai.assert;

describe("The first test", function() {
  it("should be able to run asserts", function() {
    assert(1,1);
  });
});
```
This test can be run using the command `npm test` and the out should say something like "1 passing" in 
green letters followed by the amount of time the test took to run. In this test file first the
chai library is brought in and a variable name assert is assigned to the chai assert library.
Assert takes two arguments either of which can be any javascript value including a function,
object or expression. It then passes if both arguments evaluate to the same thing and fail if 
they do not. For instance `assert(1+1, 2)` would pass and `assert(1, 2+3)` would fail.

This test can also be run in the browser but first it needs a slight modification.
```javascript
if (typeof require === 'function') {
  var chai = require('chai');
}
var assert = chai.assert;

describe("The first test", function() {
  it("should be able to run asserts", function() {
    assert(1,1);
  });
});
```
All that changed was the way in which chai is brought into the file. The browser does not have
a require method and evaluates to undefined in the browser. Trying to pull in chai this way would
 result in errors in the browser's dev console. So first the test checks if require is function 
and if it is it will require in the library and set it to a variable. If not chai should be 
included in a script tag and will be part of the global namespace. The next step is to create
an html test file that will require in all of the tests. First create a test/browser directory
and then add a test.html that contains the following:
```javascript
<!doctype html>
<html>
  <head>
    <title>Mocha/Chai Test</title>
  </head>

  <body>
    <div id="mocha"></div>
    <script src="../../node_modules/mocha/mocha.js"></script>
    <link rel="stylesheet" href="../../node_modules/mocha/mocha.css"/>
    <script src="../../node_modules/chai/chai.js"></script>
    <script>mocha.setup('bdd');</script>

    <script src="../unit/first_test.js"></script>

    <script>mocha.run()</script>
  </body>
</html> 
```
To run the tests just open up the test.html in a browser. This file first creates a div with an id of
mocha which mocha expects to append the test results to. It then includes the mocha.js, mocha.css and chai.js
files. Then it sets up mocha in bdd mode or behaviour driven development mode which is the style of 
tests in the first_test.js file. After including the first_test.js the test.html runs all of the loaded
mocha test with the `mocha.run()` command. Running tests in a browser or preferably in multiple browsers 
confirms that the code being testing works in specific browsers.

That's the basic test setup, next up, auto running tests with grunt and watch.
