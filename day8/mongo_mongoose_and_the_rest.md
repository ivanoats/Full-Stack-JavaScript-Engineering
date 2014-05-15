<a href="http://mongoosejs.com/">Mongoose</a> is an abstraction layer on top of MongoDB. It allows developers to emulate a few relational database constructs while keeping the flexibility of MongoDB. I'm going to go over installing mongodb but the instructions can be found <a href="http://docs.mongodb.org/manual/installation/">here</a>. The first step to add Mongoose to a project is to add it to the package.json dependencies.
```javascript
//package.json
{
  "name" : "notes",
  "description" : "a note taking app"
  "version" : "0.0.1",
  "dependencies" : {
    "express" : "^4.0",
    "mongoose" : "^3.8"
  }
}
```
Then run the usual `npm install` and mongoose is ready to go in an application. Mongoose uses a schema to define what an object should look like and what data it should contain. I like to store my Mongoose schemas in a folder called models from my root directory. The first model I'm going to create is a notes object. 
```javascript
var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
  body: String
});

module.exports = mongoose.model('Note', noteSchema);
```
The schema for a notes object is pretty simple. For now it only contains one field(the body of the note) which should have a type of String. All of the different field types can be found <a href="http://mongoosejs.com/docs/api.html#schema_Schema.Types">here</a>. The next step is to tell express where to find the note model in a server.js file and connect to the MongoDb server.
```javascript
//server.js
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_awesome_app');

var app = express();

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('the server is running on port ' + app.get('port');
});
```
This server.js file doesn't do much, it connects to the mongodb database running localhost and listen for incomming http requests. When starting a mongo server on my local machine I like to create a db folder in my project directory and start my mongo server with `mongod --dbpath ./db` but make sure to add db to .gitignore. The next step is create routes that actually handle REST requests. Create a folder called routes and add a file by the name of noteRoutes.js to that folder with the following:
```javascript
var Note = require('../models/note');

exports.collection = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  Note.find({}, function(err, notes) {
                if(err) {
                  res.send(500, {"error": err});
      return false;
    }
    res.send(notes);
  });
});
```
This is the function that gets all of the notes that are saved in the database and the sends them out as json if there are no errors. It uses the mongo find command through mongoose and because nothing is passed to the object in the first argument it returns every document in the collection. Also, note that it's exported as collection, because it send the entire collection. Now the express server.js file needs to updated in order to use this function.
```javascript
//server.js
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');

var noteRoutes = require('./routes/noteRoutes');

mongoose.connect('mongodb://localhost/my_awesome_app');

var app = express();

app.get('/api/v1/notes', noteRoutes.collection);

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('the server is running on port ' + app.get('port');
});
```
It only takes two lines of code to get express talking with our mongoose model. First we require the noteRoutes.js file then when we receive a get request to api/v1/notes we call noteRoutes.collection and it will return all of the objects in the notes collection. To add the rest of the REST routes is pretty simple with the rest of the REST routes the noteRoutes should look like this:
```javascript
//routes/noteRoutes.js
var Note = require('../models/note');

exports.collection = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  Note.find({}, function(err, note) {
                if(err) {
                  res.send(500, {"error": err});
      return false;
    }
    res.send(note);
  });
};

exports.findById = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  Note.findOne({"_id" : req.params.id}, function(err, note) {
    if(err) {
      res.send(500, {error: err});
      return false;
    }
    res.send(note);
  });
};

exports.create = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var note = new Note({body: req.body.body});
  note.save(function(err, resNote) {
    if(err) {
      res.send(500, {error: err});
      return false;
    }
    res.send(resNote);
  });
};

exports.update = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id;
  delete req.body._id;
  
  Note.findOneAndUpdate({'_id' : id}, req.body, function(err, note) {
                     if(err) {
                       res.send(500, {error: err});
      return false;
    }
    res.send(note);
  })
};

exports.destroy function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  Note.remove({'_id' : req.params.id}, function(err) {
    if(err) {
      res.send(500, {error: err});
      return false;
    }
    res.send({"message" : "success!"});
  });
};
```
First, since express 4 removed most of the connect middleware that was included with express 3 and the noteRoutes.js needs to parse the body of the incoming request, bodyparser has to be added to the application with `npm install body-parser --save`. Then, the server.js file should be updated to look like this:
```javascript
//server.js
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var noteRoutes = require('./routes/noteRoutes');

mongoose.connect('mongodb://localhost/my_awesome_app');

var app = express();

app.use(bodyparser());

app.get('/api/v1/notes', noteRoutes.collection);
app.get('/api/v1/note/:id', noteRoutes.findById);
app.post('/api/v1/notes',  noteRoutes.create);
app.put('/api/v1/note/:id', noteRoutes.update);
app.delete('/api/v1/note/:id', noteRoutes.destroy);

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('the server is running on port ' + app.get('port');
});
```
```})`})`})```
