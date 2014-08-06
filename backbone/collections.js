Backbone Collections 
==========================================
Backbone collections are a container for multiple Backbone models.
The represent the primary way that we will be communicating with our
Node/Express REST api. Create a collection directory under app/js/notes
and then create a NotesCollection.js file with the following code:
```javascript
var backbone = require('backbone');
var Note = require('../models/Note');

module.exports = Backbone.Collection.extend({
  model: Note,
  url: 'api/v1_0/notes'
});
```
The single Note model has to be required into the collection and set to
the model parameter. This lets Backbone know what the collection is 
comprised of. The url parameter tells Backbone where to make REST
requests to in order to retrieve the data that we need. The collection
model has a fetch method that actually goes and retrieves the data
from our REST api. To use it, modify your client.js to look something
like this:
```javascript
var Note = require('./notes/models/Note');
var NoteCollection = require('./notes/collections/NotesCollection');
var SimpleView = require('./notes/views/SimpleView');

var notes = new NoteColleciton();
notes.fetch({
  success: function() {
    console.log(notes);
  },
  error: function(err) {
    console.log(err);
  }
});
```
The fetch method takes a promise that has a success parameter and an error
parameter. If you include a promise to fetch this will almost always both
of these parameters will almost always be a function that will perform an
action on success or error. Later, we will actually set up a listener to 
reload our view when the data inside of our collection is updated. But 
before that we need to actually have a collection view. Create a Collection.hbs
file inside of app/js/notes/templates with the following:
```html
<h3>Notes:</h3>
<div class="notesCollection"></div>
```
All we need in this template is a title that will be displayed at the top of the
page and an element to place all of our individual note views into. Now,
we need the actual view. Create a CollectionView.js file inside of app/js/notes/views
with the following code:
```javascript
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Note = require('../models/Note.js');
var NotesCollection = require('../collections/NotesCollection.js');
var NoteView = require('../views/SimpleView.js');

module.exports = Backbone.View.extend({
  tagName: 'div',

  initialize: function() {
    this.collection.on('add', this.addNote, this);
    this.collection.on('reset', this.addAll, this);
  },

  addNote: function(note) {
    var noteView = new NoteView({mode: note});
    this.$el.append(noteView.el);
  },

  addAll: function() {
    this.collection.forEach(this.addNote);
  },

  render: function() {
    this.addAll();
  }
});
```
You will notice that the collection view extends the same backbone view as
our regular view. The only difference is the code that we put inside the 
view. The initialize function actually registers two listeners on the collection
object that is passed to the view. The add listener is called when a new 
model is added to the collection and the 'reset' function will be called when
a fetch is successfully called on the collection. The addNote function creates a
new view the model that passed to the function. If you remember when a single
view is created it gets rendered immediately. After the view is rendered it is
appended into our collection view. The add function does this for every note model
in the collection and all the render function does is call the add all.

Now, we need to modify our client.js file to reflect the new collection view.
```javascript
var $ = require('jquery');
var Notes = require('./notes/collections/NotesCollection');
var NotesView = require('./notes/views/CollectionView');

var notes = new Notes();
var notesView = new NotesView({collection: notes});
notesView.render();

notes.fetch({
  succes: function() {
    $('#content').append(noteView);
  }
});
```
This code first create a new collection and collection view then calls fetch on
the notes collection and on success appends the view to the document. In our case this 
document is index.html and after a rebuild we should see all of our notes on the page.
