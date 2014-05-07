Hello Express
=====================
Express is a minimalistic web framework built on top of Node.js. Based on
Ruby's Sinatra framework it abstracts away a lot of the boiler plate
code required to get a Node web server up and running. Created by
 <a href="https://github.com/visionmedia">TJ Holowaychuck</a> Express is built
using <a href="http://www.senchalabs.org/connect/">Connect</a> another abstraction
for creating web servers with Node. Express 3.x includes a suite of middleware
that were abstracted into their own modules with Express 4. Read more about it <a href="http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0">here</a>

The first step in creating an express application from scratch is to create
a new folder with `mkdir hello_express`. Change into the director with `cd hello_express`
and  create a file with the name `package.json`. Inside of the file place the following:

    {
      "name" : "hello-express",
      "description" : "a hello world web application written in express",
      "version" : "0.0.1",
      "dependencies" : {
        "express" : "^4.0"
      }
    }

A package.json file is found in nearly every Node packag or application. It tells npm about our
 application. The name and description would appear in npm if we were creatin a node
package. The version is the <a href="http://semver.org/">Semantic Versioning</a> version
of our application and the dependencies tell npm what packages we need in order to
run our application. In this case the only package that we need is express. After saving
this file run `npm install` from the command in our hello_express directory and npm
will install Express and all of it's dependencies and save them into a folder called node_modules. 
Now seems like a perfect time to create a git repository for our application.

    git init
    touch .gitignore
    echo "node_modules/" >> .gitignore
    git add .
    git commit -m "add package.json and .gitignore"

First we need to create a .gitignore file. This file tells git not include our node_modules
folder in our version control. This folder can get quite large and we already have our
dependencies declared in our package.json file, so it becomes redundant. Now we need to 
create a simple web server. Create a file called server.js and add the following code:

    var express = require('express');
    var http    = require('http');

    var app = express();

    app.get('/', function(req, res){
      res.send('hello world!');
    });
    
    var server = http.createServer(app);
    server.listen(3000, function(){
      console.log('the server is running on port 3000');
    });

In this file we first require the express package within our server.js file. We then require
http which will be used to create the actual server. Then we create our app by calling the root 
express function. The app.get line is a <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">REST</a>
get request to our root url that simple writes 'hello world!' to the browser. In the final section
we create a server and start it listening on port 3000, we pass a callback that gets called
when the server is running that simple outputs 'the server is running on port 3000' to the console.
To start our server simply run `node server.js` from the command line. Then point your preferred 
browser to http://localhost:3000, you should see the text `hello world!`.


Now this particular server isn't especially useful or interesting but we can modify it to serve
static html pages using one of the few optional middlewares that didn't get abstracted out of
Express 4, static. Modify your server.js file to look like this:

    var express = require('express');
    var http    = require('http');

    var app = express();

    app.use(express.static(__dirname + '/public'));

    app.server.listen(3000, function() {
      console.log('the server is listening on port 3000');
    });

Our server now serves any file located in the /public directory. The __dirname in this version of the server.js
points to the root directory of our application. This is a node global and is available anywhere in a 
node program. Next we need to create the /public directory, run `mkdir public` from the console.
Now place create an index.html file in the public directory and add the following to it:

    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <title>Hello World Express</title>
        </head>
        <body>
          Hello World from an html document!
        </body>
    </html>

If you close the server we had running and run `node server.js` again, when you browse to http://localhost:3000
you should see the text `Hello World from an html document`. You can also serve up anything you place in the
public directory, including javascript files, images, css stylesheets and other html files. Don't forget to commit
the changes!

    git add .
    git commit -m "serving static files"
