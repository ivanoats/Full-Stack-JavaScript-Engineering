# Add an Express Server for Your Blog

We are going to make this into a Full-Stack app. Let's add an ExpressJS server to serve up your blog posts.

## Install Express

`npm install express --save`

## Create a static site express server

You can re-use your code from the [Hello Express](day4/hello_express.md) lesson. Just change the static folder from `public` to `dist`.

_server.js:_

```javascript
var express = require('express');
var http    = require('http');

var app = express();

app.use(express.static(__dirname + '/dist'));

var server = http.createServer(app);
app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function() {
  console.log('the server is running on port', app.get('port'));
});
```

## Modify the Gruntfile to Serve Files from Express

### Step One

We are going to serve the front-end files from the `Dist` folder instead of from `.tmp`.

While under development, I don't want to minify my CSS or uglify my JS. I was having some issues with the Gruntfile in this yeoman generator-browserify, so I ended up commenting out the cssmin and uglify tasks near the end of the Gruntfile:

```javascript
  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    //'cssmin',
    //'uglify',
    'modernizr',
    'copy:dist',
    'rev',
    'usemin'
  ]);
```

That's certainly not a best practice, but it was a work-around that I took to get moving again.

Now, to build the site into the `dist` folder, I did `grunt build`.

I also did `node server.js` from the command line and just double-checked that the site loaded fine.

### Step Two

Take out the connect server from the Gruntfile and replace it with grunt-express-server.

`npm install grunt-express-server --save-dev`

You can copy your Grunt initConfig for grunt-express-server from the [Acceptance Testing with CasperJS]() lesson.

```javascript
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
        node_env: 'production'  //jshint ignore:line
      }
    },
    test: {
      options: {
        script: 'server.js'
      }
    }
},
```

Don't remove the grunt-contrib-connect initConfig section because parts of the Gruntfile depend on it.

