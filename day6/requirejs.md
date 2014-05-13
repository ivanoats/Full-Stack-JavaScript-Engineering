Require.js and AMD
======================================
Right now, two client side Javascript module loaders are duking it out to claim the title of #1 super best before the wide adoption ES6: <a href="http://browserify.org/">Browserify</a> and <a href="http://requirejs.org/">Require.js</a>. So far in my Javascript adventures, learning and using Browserify has proved to be much easier. It shares the CommonJS method of module loading with Node and can automatically pull in bower components using the debowerify transform with grunt. Require <a href="http://requirejs.org/docs/whyamd.html#amd">boasts</a> a lot of advantages in using the Asynchronous Module Definition(AMD) over CommonJS. This intrigued me, so I though I would wade into the odd looking module definition syntax and get Require.js up and running with Grunt and a simple static file express server.

First step, create a package.json file that looks something like this:

    {
      "name": "requirejs-grunt-demo",
      "description": "a demo app using require.js, grunt and express",
      "version": "0.0.1",
      "dependencies": {
          "express": "^4.0"
      },
      "devDependencies": {
        "grunt": "^0.4",
        "grunt-contrib-clean": "^0.4",
        "grunt-contrib-copy": "^0.4",
        "grunt-contrib-requirejs": "^0.4"
      }
    }
It's a pretty simple set of dependencies, express for serving the site (although this could easily be an http or connect server) and grunt with some plugins to build the static assets. The grunt-contrib-clean plugin deletes all the files from the previous build. The grunt-contrib-copy plugin copies everyfile that isn't a Javascript file into the build. Finally grunt-contrib-requirejs helps to build all of the Javascript files into a single file that can be included in a static html page. First up, here's the app.js express server:

    var express = require('express');
    var http = require('http');
    
    var app = express();
    
    app.use(static(__dirname + 'build/'));
    
    var server = http.createServer(app);
    server.listen(3000, function() {
   	  console.log('server started');
    });
This code should be pretty straight forward. It creates a static file server that seves up everything in the build directory. Next the app needs something to place in the build directory when the build task is run. I like to place my source in an app directory the tree of which should look something like this:

    |-app
    |---css
    |---js
    |---index.html
The index.html page contains a basic 'hello world' html5 page:

    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <title>Hello World!</title>
            <script data-main="client.js"
            src="bower_components/requirejs/require.js">
			</script>
            <link href="styles.css" rel="stylesheet"/>
        </head>
        <body>
          Hello World!
        </body>
    </html>
The script tag looks a little different than normal because it uses the Require.js convention of placing a link to the require.js library in the src field and a link to the code that utilizes the libaray in the data-main field. Everything else in this file should look familiar.

I'm actually not going to go over any styling because my styling is abysmal and I don't want to embarrass myself any more than necessary. Which means that next up is the bower configuration. I usually just run `bower init` from the root of the directory and answer the questions. Then create a .bowerrc file with the following:

    {
      "directory": "app/bower_components"
    }
This tells bower to install the components in app instead of the root of the project. Next, run `bower install requirejs --save` and `bower install jquery --save`. Alright that's all of the initial config and setup, next up is the Gruntfile.

<a href="http://gruntjs.com/">Grunt</a> is a task runner for Javascript that makes the process of development much smoother. It allows the conifuration of tasks much like Rake does for Ruby or make does for C. If you haven't used Grunt before I suggest checking out the docs because I'm not going to go over the basics. Create a Gruntfile.js that looks like this: 

    module.exports = function(grunt) {
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-contrib-requirejs');
      
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: {
          build: ['build/'],
          dev: {
            src: ['build/**/*']
          }
        },
        
        copy: {
          dev: {
            expand: true,
            cwd: 'app',
            src: ['*.css', '*.html', 'bower_compenents/requirejs/require.js'],
            dest: 'build/',
            flatten: false,
            filter: 'isFile'
          }
		    },
        
        requirejs: {
          compile: {
            options: {
              name: 'config',
              baseUrl: 'app/js/',
              mainConfigFile: 'app/js/config.js',
              out: 'build/client.js',
              optimizer: 'none'
            }
          }
        }
      });
      
      grunt.registerTask('build:dev', ['clean:dev', 'requirejs', 'copy:dev']);

    };
When build:dev is called first it removes everthing currently in the build directory. Then it takes all of the files specified in the the `app/js/config.js` file and "compiles" them into build/client.js. Finally, it copies over our static files including the requirejs library. 

The final step is to get some requirejs files into the application. There are going to be two files, app/js/config.js and app/js/main.js. The config.js is the base file and contains logic to load all of the libraries and custom js files for the application. It should look something like this:

    require.config({
      paths: {
        "components": "../bower_components",
        "jquery": "../bower_components/jquery/dist/jquery"
      }
    });
    
    require(['main'], function() {console.log('main.js loaded');});
First this file tells require where it can find our bower_comonents and jquery. These files don't need to be copied over with grunt-contrib-copy as they will be included in our client.js file. The require statement at the bottom takes a series of file names(in this case just main.js) and a callback which runs once the module is loaded. The main.js file is where jquery is going to be loaded and used and it should look something like this:

    define(['jquery'], function($) {
       $('body').append('</br> Hello World from Require.js');
     });
The define function takes an array of depencies and a callback that executes when they have all been loaded. Each parameter in the callback contains the modules loaded through the dependencies, in order. For instance, to load <a href="http://backbonejs.org/">Backbone.js</a> with jquery and underscore the define statement would look something this:

    define(['jquery','underscore','backbone'], function($, _, Backbone) {});
Of course, the location of those would have to be specified in the config.js as well. That's the basics and the way I managed to get requirejs working for my workflow(yes the alliteration is intentional) with grunt and bower.
