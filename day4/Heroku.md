# Heroku

Let's get our site LIVE ON THE WEB!! This process is called __deployment__.

## Slides
[Slides](pdf/cf_heroku.pdf) from class introducing Heroku.

## Installation

Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com) installed.

You can usually `brew install heroku-toolbelt` or `sudo apt-get install heroku-toolbelt`. If those don't work you may need to donwload it.

Also, if you haven't already, sign up for an account on [Heroku.com](http://heroku.com).

## Login

Use `heroku login` to log in to heroku from the command line.

If you're already logged in, you can use `heroku auth:whoami` to see who you are logged in as.

## Create a heroku app

You'll want a nice name for your app instead of the random ones Heroku gives you.

E.g. `heroku create ivan-hello-world-express`

## Create the Procfile

You need a file to tell heroku how to launch your app.

Edit `Procfile` which should be in the root directory of your project. No file extension on this file, and it needs to start with a Capital letter. The procfile is simply:

```
web: node server.js
```

This tells heroku that to start your web server, it needs to run the command `node server.js`

## Test it out locally with node-foreman

You can use a npm package called foreman to test that your Procfile works as expected. Install this globally.

`npm install -g foreman`

This will give you the `nf` command. Try it out.

`nf --help`

And, now, try starting your server via foreman.

`nf start`

It should start up your server on port 5000 as a default.

This means that your server should not have any port 'hard-coded' as a default (like 3000). Make sure your server code looks something like this:

```javascript
var server = http.createServer(app);
app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function() {
  console.log('the server is NOW running on port', app.get('port'));
});
```

## Commit any changes and push to Heroku

Make sure to commit any changes you made to your app, like adding the Procfile, etc.

`git add .`

`git commit -m 'preparing for heroku'`

Make sure you're on the master branch or that you merge you changes back to master.

And now, to deploy your app to the web on Heroku:

`git push heroku master`

You'll see a bunch of info scroll by from Heroku, but it should look something like this:

```
$ git push heroku master
Fetching repository, done.
Counting objects: 7, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 343 bytes | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)

-----> Node.js app detected

       PRO TIP: Specify a node version in package.json
       See https://devcenter.heroku.com/articles/nodejs-support

-----> Defaulting to latest stable node: 0.10.28
-----> Downloading and installing node
-----> Restoring node_modules directory from cache
-----> Pruning cached dependencies not specified in package.json
       npm WARN package.json hello-express@ No repository field.
-----> Writing a custom .npmrc to circumvent npm bugs
-----> Exporting config vars to environment
-----> Installing dependencies
       npm WARN package.json hello-express@ No repository field.
-----> Caching node_modules directory for future builds
-----> Cleaning up node-gyp and npm artifacts
-----> Building runtime environment
-----> Discovering process types
       Procfile declares types -> web

-----> Compressing... done, 5.3MB
-----> Launching... done, v4
       http://ivan-hello-world-express.herokuapp.com/ deployed to Heroku

To git@heroku.com:ivan-hello-world-express.git
   3d47745..3f34feb  master -> master
```

And you can open your browser, and visit your app on the web!









