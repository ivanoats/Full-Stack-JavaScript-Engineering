# Browserify Lab

Let's modify our [Hello World Express]() server to use Browserify and friends.

## Install Browserify

`npm install -g browserify`

## GRUNT ALL THE THINGS

`npm install grunt-contrib-copy grunt-contrib-clean grunt-contrib-jshint grunt-contrib-watch grunt-browserify matchdep globule --save-dev`

These tools will help clean and build our files

## Install the Debowerify transform

`npm install debowerify --save`

This lets us use front-end packages from Bower.

## Set up Bower

`bower init`

And install jQuery:

`bower install jquery`

## Set up a distribution directory

`mkdir dist && echo "dist" >> .gitignore

## Set up the Gruntfile

You can copy this one:

```javascript
'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist'],

    copy: {
      all: {
        expand: true,
        cwd: 'src/',
        src: ['*.css', '*.html', '/images/**/*', '!Gruntfile.js'],
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      },
    },

    browserify: {
      all: {
        src: 'src/*.js',
        dest: 'dist/app.js'
      },
      options: {
        transform: ['debowerify'],
        debug: true
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      },
    },

    connect: {
      options: {
        port: process.env.PORT || 3000,
        base: 'dist/',
      },

      all: {},
    },

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: '<%= copy.all.src %>',
      },

      js: {
        files: '<%= browserify.all.src %>',
        tasks: ['browserify'],
      },

      assets: {
        files: ['assets/**/*', '*.css', 'images/**/*', 'img/**/*', '!Gruntfile.js'],
        tasks: ['copy'],
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'clean', 'browserify', 'copy']);
  grunt.registerTask('server', ['default', 'connect', 'watch']);

};
```

## Node Static

A useful package to have around in your global NPM package list is [node-static](https://github.com/cloudhead/node-static)

Install it with:

`npm -g install node-static`

This can be a simple way of quickly serving up a public or dist directory, without messing around
with creating another Gruntfile task.

## Using jQuery and Your Own Module with Browserify

Create a file called `post.js` in your `src` folder:

```javascript
var Post = function(title) {
  return {title: title};
}

module.exports = Post;
```

This could be the very beginnings of a Post object that could be used in a blog app.
We're using module.exports to make this Post contstructor available via the CommonJS
module system,  Browserify, in the web browser.

Now, create another file called 'main.js' in your `src` directory:

```javascript
var $ = require('jquery');
var Post = require('./post');

var how_to_use_browserify = new Post("How to use browserify");

$('body').append('<h2>' + how_to_use_browserify.title + '</h2>');
```

* This file requires jQuery and assigns it to the $ variable.
* It then loads in ourPost object constructor. 
* We create an instance of a post called `how_to_use_browserify`
* We then use jQuery to append our post's title in an h2 element to the body of 
our web page.
