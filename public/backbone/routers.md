Backbone Routers
========================
Routers are the last backbone component that we'll look at.
Routers determine which views/controllers get loaded based
on user actions. Backbone routers tie all the other pieces together
and really define what actions a user can perform in our application.

Create the folder `app/js/notes/routers` then place a NotesRouter.js
file in that folder with the following code:
```javascript
var Backbone = require('backbone');
var $ = require('jquery');
Backboe.$ = $;
var Note = require('../models/Note');
var SimpleNoteView = require('../views/SimpleView');
var NotesCollection = require('../collections/NotesCollection');
var NotesCollectionView = require('../views/NotesCollectionView');

module.exports = Backbone.Router.extend({
  routes: {
    "notes": "index"
  },

  index: function() {
    var self = this;
    this.notes = new NotesCollection();
    this.notes.fetch();
    this.notesView = new NotesCollectionView({collection: self.notes});
    this.notesView.render();
    $('#content').html(self.notesView.el);
  }
});
```

Alright, there are a lot of new concepts in this short segment of code.
The Router always has a routes parameter that actually sets up the routes
that are available to our application. This routes parameter is a json object
that takes the url to hit from our base and the name of a function to call when 
that base in navigated to. In the index function we create both the notes
collection and the notes collection view and save them to the router.
We will eventually change this to occur on initialize but for now we only have
the one action. The collection view then replaces the div in our index.html
page with the id of content and we rebuild and navigate to our index page
we should see all of the notes we have saved in the database.

Now we need to update our client.js file to reflect the addition of the
router:
```javascript
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var NotesRouter = require('./notes/routers/NotesRouter');

var notesRouter = new NotesRouter();

Backbone.history.start();
```
You'll notice that our Backbone controller is much cleaner. All we need is
Backbone/jquery and the router. The `Backbone.history.start()` line merely
tells backbone to start routing urls. The router can also take a {pushState: true}
parameter that will translate '/' based routing into Backbone's '#' style routing.
We'll get into that a little more in the next section on CRUD with backbone.
