Testing with Super Agent
===============================
Super Agent is a tool to make REST requests from within Node. It makesthe sending requests
as easy as .put or .get, much in the same way that express allows you to simplify the handling
of incoming REST requests. While Super Agent is not specifically designed to test JSON apis,
it greatly simplifies acceptance testing of said JSON apis. Testing using Super Agent requires
both a testing framework, as well as a collection of expect statements. Also being able to run
tests from Grunt is key. A combination of Mocha and Chai should fit the bill nicely. First run
`npm install superagent chai mocha --save` then create a test file test/api/notes_api_test.js with the
following code:
```javascript
var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
var app = require('../server.js').app;

describe('Notes JSON api', function() {
  var id;

  //testing the POST function of the JSON API
  it('can successfully create a new note', function(done) {
    superagent.post('http://localhost:3000/api/v1/notes/')
      .send({
        body: 'a new note!'
      })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.not.be.eql(null);
        expect(res.body.body).to.be.eql('a new note!');
        id = res.body._id;

        done();
      })
  });

  //testing the GET function of the JSON API
  it('can successfully get a note', function(done) {
    superagent.get('http://localhost:3000/api/v1/note/' + id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.be.eql(id);
        expect(res.body.body).to.be.eql('a new note!');

        done();
      })
  });

  it('can successfully update a note', function(done) {
    superagent.put('http://localhost:3000/api/v1/note/' + id)
      .send({
        body: 'an updated note'
      })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body._id).to.be.eql(id);
        expect(res.body.body).to.be.eql('an updated note');

        done();
      })
  });

  it('can successfully delete a note', function(done) {
    superagent.del('http://localhost:3000/api/v1/note/' + id)
      .end(function(err, res) {
        expect(err).to.eql(null);

        done();
      });
  });
});
```
Some interesting things happen in this code, first when app is required from server.js it actually starts the server before sending JSON requests to it. When each request is sent to the server it returns a callback response that should contain a successful JSON object.  In the case of the creation of this object(the POST request) it returns a copy of the object that presumably has been saved to a persistent database. It's integration testing, so while it's not precise it does test the general use case for the JSON api.```')})})```
