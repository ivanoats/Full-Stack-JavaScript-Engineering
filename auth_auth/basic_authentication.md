JSON Authentioncation with Passport and Basic HTTP
===================================================
Many modern webapplications have an architecture that involves a client side
Javascript web app talking to serverside persistence layer over JSON.
Authentiation over a JSON api is a tricky subject, primarily due to its stateless nature.
Although http is technically stateless, the browser is capable of storing
cookies that can be checked by a webserver when requests are made to it. But 
with a JSON api the server does not have direct access to the browser. Each
request has no knowledge of any of the previous requests, meaning that each
request that needs to be authenticated needs to transmit its credentials with 
the request. The eventual goal is to have a piece of information that can be
easily passed to every request that tells nothing about the user if passed in
the clear. Most APIs (such as Twitter or Facebook) use a public/private key that
have to be created on their site in order to use their api but asking a user to
do this in order to use a website would be ridiculous. The goal is to have a token
that will be created by the server and passed back to the client that can then 
sent with every request that needs to be authenticated. Eventually this well be
JSON Web Token that contains an encrypted set of information that allows
the server to find the user and all their attributes. However, the server
first needs to determine if the should sent the token the client requesting it,
which will require a user name and password.

I have found two easy ways to implement this with passport, HTTP Basic and Digest.
The basic method of authentication sends the username and password over in
plain text which is less than ideal but digest request that the password be
stored in plain text in the server's database which is even less ideal. 
Considering how easy it is to use HTTPS using node and frequently servers
seem to get broken into my personal preference is to use http basic over a 
secured connection. During development the server will be using a self signed 
certificate but in production this would need be replaced with actual ssl 
cert to avoid scary warnings in the browser. Instructions on how to generate
a certificate can be found <a href="https://www.openssl.org/docs/HOWTO/certificates.txt">here</a>.

The first step to authentication a node server with JSON api is to create a 
node server with a JSON api. Create a new repository with a package.json file
that looks something like this.
```javascript
{
  "name" : "awesome-json-api",
  "description" : "my super awesome json api",
  "version" : "0.0.1",
  "dependencies" : {
    "express" : "^4.x",
    "passport" : "^0.2",
    "passport-http" : "^0.2"
    "mongoose" : "^3.8",
    "bcrypt" : "latest",
    "jwt-simple" : "^0.2",
    "moment" : "^2.7"
  }
}
```
In our package.json file we're including express 4, passport for general passportyness, 
passport-http which provides the http-basic authentication mongoose for saving users to 
the database and bcrypt for encrypting the passwords that will be saved in the database.
Make sure to run `npm install` from the root directory as well as generate a self signed
ssl cert and key and place them in a folder called config. Now create a server.js file that looks 
something like this. 
```javascript
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var https = require('https');
var fs = require('fs');

var app = express();

var options = {
  key: fs.readFileSync('config/key.pem'):
  cert: fs.readFileSync('config.cert.pem'):
};

app.get('/', function(req, res) {
  res.json({'msg' : 'hello world!'});
});

var server = https.createServer(options, app);
server.listen(process.env.PORT || 3000, function() {
  console.log('server running on port: ' + process.env.PORT || 3000);
});
```
This server.js file pulls in the self signed certificate and key and creates a hello world 
https server based on those. The current version of this file also pulls in all of the libraries
that will eventually be needed for authentication. The next step in the process is going to be 
the creation of a User model. This particular model comes primarily from the authentication
setup described on <a href="http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local">the scotch.io site</a>.
the method of authentication there is pretty awesome but it doesn't work over a JSON api as
it requires both access to the browser through session cookies and uses redirects for success/failure.
Create a directory called called models from the project root and add the following User.js file to that
directory.
```javascript
//models/User.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = reuqire('jwt');
var moment = require('moment');

var userSchema = mongoose.Schema({
  basic: {
    email: String,
    password: String
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.checkHash = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.createJWTToken = function(app) {
  var expires = moment().add('days', 7).valueOf();
  var that = this;
  var token = jwt.encode({
    iss: that._id,
    expires: expires
  }, app.get('jwtTokenSecret'));
  return token
};

module.exports = mongoose.model('User', userSchema);
```
This user model contains three methods, one that will run an incoming password through a one way hash
and one that will check an incoming password against a hash saved in the database. Bcrypt handles
all of details of encrypting a password and adding salt through the genSaltSync command. Keep in mind that
the higher the number passed into that function the longer it will take to save a user to the database or
check if a user's credentials are correct. It's a synchronous function so this is less than ideal.
The third method is used to generate a JSON Web Token after a user's credentials have been successfully
authenticated, I will go over this function once we get to the JWT portion of this tutorial.

Now that the user model has been created, passport needs to know how to use it to authenticate requests.
I like to keep all of my authentication related js files in lib/authentication/, create both those folders
and add the following passportBasic.js file to it.
```javascript
//lib/authentication/passportBasic.js
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../../models/User');

module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, passord, done) {
    User.findOne({'basic.email': 'email'}, function(err, user){
      if(err) {
        return done(err);
      }

      if(!user) {
        return done(null, false);
      }

      if(!user.validPassword(password)) {
        return done(null, false);
      }

      return done(null, user);
    });
  }));
};
```
This file essentially specifies what conditions mark a successful authentication. First we attempt to find the user
if there's a error we return the error. If the user doesn't exist we return false for authentication. If the 
password doesn't authenticate we return false. If the program makes it past those conditions it means it found a 
valid user and we return the user to passport. Passport knows that if false is returned from this function it should send
a 401 unauthorized to the client making the request. Something to keep in mind, this passport definition is only
going to be used when a user signs in. When a user is created it won't need to go through an authentication process
and every other request should be authenticated with the JWT that will be generated upon a successful sign in.
The next step is to create the sign up/sign in routes for the application. Create a routes directory from the root directory 
and add the following userRoutes.js file to that directory. 
```javascript
var user = require('../models/userRoutes');

module.exports = function(app, passport) {
  app.post('/api/v1/users', function(req, res) {
    User.findOne({'basic.email': req.body.email}, function(err, user) {
      if(err) {
        return res.json(500, err);
      }

      if(user) {
        return res.json(401, {'msg' : 'email in use'}):
      }

      var newUser = new User();
      newUser.basic.email = req.body.email;
      newUser.basic.password = newUser.generateHash(req.body.password);

      newUser.save(function(err, resUser) {
        if(err) {
          return res.json(500, err);
        }

        return res.json(resUser):
      });
    });
  });

  app.get('api/v1/users', passport.authenticate('basic', {session: false}), function(req, res) {
    return res.json({'jwt': req.user.createToken(app)}); 
  }); 
};
```
The first function creates a user on a post request and saves it to the database if there is no other user with
the specified email after hashing the incoming password. With the login route(a get request /api/v1/users) 
the request will go through the authentication we specified with passport and if successful it will run
the function that has been specified in the get route. The last step to hooking up basic authentication is to
add it to the server.js file.
```javascript
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var https = require('https');
var fs = require('fs');

var app = express();

app.set('jwtTokenSecret', process.env.JWT_SECRET || 'changemechangemechangeme');
require('./lib/authentication/pasportBasic')(passport);
require('./routes/userRoutes')(app, passport);

var options = {
  key: fs.readFileSync('config/key.pem'):
  cert: fs.readFileSync('config.cert.pem'):
};

app.get('/', function(req, res) {
  res.json({'msg' : 'hello world!'});
});

var server = https.createServer(options, app);
server.listen(process.env.PORT || 3000, function() {
  console.log('server running on port: ' + process.env.PORT || 3000);
});
```
Those two require lines are all it takes to add the authentication to passport and then add the signup/signin routes
to the app. This new server.js also sets the jwtTokenSecret that is used to encrypt the JSON web tokens that the 
User model generates. 

There is only one more piece to add to this application to be able to authenticate with JSON Web Tokens, the actual
middleware that checks if the token/user on the incoming request is valid. Create a jwtAuth.js file in lib/authentication
with the following code:
```javascript
//lib/authentication/jwtAuth.js

var User = require('../../models/User');
var jwt = require('jwt-simple');

module.exports = function(app) {
  var jwtauth = {};

  jwtauth.auth = function(req, res, next) {
    var token = req.body.jwt;

    if(!token) {
      return res.send(401, {'msg': 'no token specified'});
    }

    var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
    User.findOne({'_id': decoded.iss}, function(err, user) {
      if(err) {
        return res.send(500, err);
      }

      if(!user) {
        return res.send(401);
      }

      req.user = user;
      return next();
    });
  };
};
```
In this function we create a jwtauth object with an auth function. This is due to the need to use a function as middleware
which request a specific format a specific format but the app needs to passed in to the exported function in order to access the token secret.
This function attempts to decode the token if one is specified. After the token is decoded this function attempts to find
a user with the specified id and if one exists it calls the next function. If any of these conditions are not met the 
app sends a 401. This function can be placed within the call chain of a route. For instance to use it in our server.js
hello world route we just add it before the function that sends hello world.
 ```javascript
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var https = require('https');
var fs = require('fs');

var app = express();

var jwtauth = require('./lib/authentication/jwtAuth')(app);

app.set('jwtTokenSecret', process.env.JWT_SECRET || 'changemechangemechangeme');
require('./lib/authentication/pasportBasic')(passport);
require('./routes/userRoutes')(app, passport);

var options = {
  key: fs.readFileSync('config/key.pem'):
  cert: fs.readFileSync('config.cert.pem'):
};

app.get('/', jwtauth.auth, function(req, res) {
  res.json({'msg' : 'hello world!'});
});

var server = https.createServer(options, app);
server.listen(process.env.PORT || 3000, function() {
  console.log('server running on port: ' + process.env.PORT || 3000);
});
```
To use the jwt authentication middleware just require it into the app and place it in the function chain for a route.
