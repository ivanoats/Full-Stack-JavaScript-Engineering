Backbone CRUD
===============================
The final step in our backbone application is to make a CRUD interface
for our Backbone app. CRUD stands for Create, Read, Update, Destroy
and represents the basic functionality you need to have a working app.
In the case of our Notes application we need to be able to create
a new note, see that note, edit that note and remove that note from our
notes list. We already have this CRUD setup on our express app, now 
we just a way for the average user to be able to do the same thing.

We already have two different methods of 'reading' our notes. Both the
simple view and the notes collection view. The next step is going to be
the creation of new notes. There are three main pieces to this functionality.
First, we need a template that contains a form for the note. Then, we need a
view to be able to render the form. Finally, we need an action can get
the data from the form and save it to our database using the rest api.

Create a NoteForm.hbs file under `app/js/notes/templates` with the following
code:
```html
<form class="noteForm" action="">
  <input type="text" name="noteBody" placeholder="new note"></input>
  <button>Submit</button>
</form>
```
All this template contains is a text form for our note which really
is just the noteBody. The next step is to create the view to contain
this noteBody, which will contain the actual logic for creating the
note and saving it. Add a file called NoteFormView.js to `app/js/notes/views`
with the following code:
```javascript
// app/js/notes/views/NoteFormView.js

'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName: 'div'

  intialize: function() {
    this.render();
  },

  events: {
    submit: "save"
  },

  render: function() {
    var template = require('../templates/NoteForm.hbs');
    this.$el.html(template(this.model.toJSON()));
    return this;
  },

  save: function(e) {
    e.preventDefault();
    var newNoteBody = this.$('input[name=noteBody]').val();
    this.model.save({noteBody: newNoteBody}, {
      success: function() {
        Backbone.history.navigate('index', {trigger: true});
      },
      error: function() {
        console.log('could not save note');
      }
    });
  }
});
There is a lot of new functionality in this view. The first thing to notice is 
the events object, which is a lot like the routes object in our router. The left
side of each entry is the action that we're listening for and the right side is
the function to call when that action happens. In our case we're waiting for the
notes form to be submitting and when that happens we call the save function.
Notice that we don't require note model into this view. Instead we rely on the
router to place the note model into our view as the model parameter and use the
mode.save function with our new data specified in the first object argument
We could instead do something like this:
```javascript
save: function(e) {
  var newNoteBody = this.$('input[name=noteBody]').val();
  var newNote = new Note();
  newNote.set('noteBody', newNoteBody);
  newNote.save({}, {
    success: function() {
      Backbone.history.navigate('index', {trigger: true});
    },
    error: function() {
      console.log('could not save note');
    }
  });
}
```
And that would accomplish the same task but it would require that we pull in the
Note model at the top of our view code. On a successful save you'll notice 
another new method `Backbone.history.navigate('index', {trigger: true})` 
which will send us to the index action of our router. The {trigger: true} 
options tells navigate to go to that page now.

The main benefit of using the generic model.save form rather than creating a new model
in our view and setting the parameters is that we can use the same functionality for 
updating our note. Instead of passing a new not into the model in the router, we can just pass
a preexisting model. The next step, it would seem, is to exit our notes router.
```javascript
// NotesRouter.js

'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Note = require('../models/Note');
var SimpleNoteView = require('../views/SimpleView');
var NotesCollection = require('../collections/NotesCollection');
var NotesCollectionView = require('../views/NotesCollectionView');
var NoteFormView = require('../views/NoteFormView');

module.exports = Backbone.Router.extend({
  routes: {
    "notes": "index",
    "notes/new": "create",
    "notes/edit/:id": "update"
  },

  index: function() {
    var self = this;
    this.notes = new NotesCollection();
    this.notes.fetch();
    this.notesView = new NotesCollectionView({collection: self.notes});
    this.notesView.render();
    $('#content').html(self.notesView.el);
  },

  create: function() {
    var note = new Note();
    var noteFormView = new NoteFormView({model: note});
    $('#content').html(noteFormView.el);
  },

  update: function(id) {
    var note = new Note({'_id': 'id'});
    var noteFormView = new NoteFormView({model: note});
    note.fetch({
      success: function() {
        noteFormView.render();
        $('#content').html(noteFormView.el);
      },
      error: function() {
        cosole.log('couldn't find note');
        Backbone.history.navigate('index', {trigger: true});
      }
    })
  }
});
```
Notice in the `:id` in the update route for, this tells backbone that any text
following the `notes/edit` should be saved into the id variable which you'll notice
is a parameter for the update function. We then use this variable to find the note
that we're looking for and send it in as the model for the form model. If we find
the model we render the form and set our content to that view. If not, we got back
to the index route.

Before we create links to all of these new routes we need to create a delete route.
We can actually do this without creating a new view and just place it as an action
in our router.
```javascript
// NotesRouter.js

'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Note = require('../models/Note');
var SimpleNoteView = require('../views/SimpleView');
var NotesCollection = require('../collections/NotesCollection');
var NotesCollectionView = require('../views/NotesCollectionView');
var NoteFormView = require('../views/NoteFormView');

module.exports = Backbone.Router.extend({
  routes: {
    "notes": "index",
    "notes/new": "create",
    "notes/edit/:id": "update",
    "notes/delete/:id": "destroy" 
  },

  index: function() {
    var self = this;
    this.notes = new NotesCollection();
    this.notes.fetch();
    this.notesView = new NotesCollectionView({collection: self.notes});
    this.notesView.render();
    $('#content').html(self.notesView.el);
  },

  create: function() {
    var note = new Note();
    var noteFormView = new NoteFormView({model: note});
    $('#content').html(noteFormView.el);
  },

  update: function(id) {
    var note = new Note({'_id': id});
    var noteFormView = new NoteFormView({model: note});
    note.fetch({
      success: function() {
        noteFormView.render();
        $('#content').html(noteFormView.el);
      },
      error: function() {
        cosole.log('couldn't find note');
        Backbone.history.navigate('index', {trigger: true});
      }
    })
  },

  destroy: function(id) {
    var note = new Note({'_id': id});
    note.destroy({
      success: function() {
        console.log('note deleted');
      },
      error: function() {
        console.log('note could not be deleted');
      }
    });
  }
});
```
All we do is create a new not with the id of the note that we're trying to delete
and then calling the destroy function on that note. Backbone takes care of sending
the proper request to our rest api. We don't need to add the redirect as this action
won't have a view rendered for it, so we should already be on the index page.

Now we need to add link to all of these functions. We really only have to do this
in two places: the note simple view and the collection view. We'll add the update
and destroy actions to the simple view and the new action to the collection view.
Update the simple view template to look like this:
```html
<p>{{noteBody}}</p>
<a href="{{'#/notes/edit/' + _id}}">Edit Note</a>
<a href="{{'#/notes/delete/' + _id}}">Delete Note</a>
```
We use href link in this case as I find them easier to work with than the backbone
navigate feature. Although if you change your routing they will all have to be
update, tradeoffs. Next update the collection view to look like this:
```html
<a href="#/notes/new">New Note</a>
<h3>Notes:</h3>
<div class="notesCollection"></div>
```
With that, we should now have a working crud interface that allows us to successfully
CRUD notes.
