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