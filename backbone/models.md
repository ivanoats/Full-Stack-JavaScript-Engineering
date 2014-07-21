Backbone Models
===========================
The most fundamental piece of Backbone is the model. The model will
define all of the data interaction for the application. It not only
communicates with the server but also will provide methods for manipulating
that data.

All of the components of Backbone are created by using the Backbone extends
method but before that we need to get backbone into the notes application.
Beacause Backbone is a client side framework we're going to install it using
bower. `bower install --save backbone jquery`. Jquery isn't a hard dependency 
for Backbone but it is frequenty used primarily to tell our views how to get
their information into our html doccument, which will be covered in the views
section. 

After installing Backbone create a models direcotor under the client side app
directory `mkdir -p app/js/notes/models`. Now create a Note.js file in that 
directory and add the following code.
```javascript
//Note

var Backbone = require('backbone');

moduled.exports = Backbone.Model.extend({
  defaults: {
    noteBody: 'hello world'
  }
});
```
This file contains a constructor for a very simple model. I like to place a 
comment at the top of my model files so I have a reminder besides the file name.
All this model currently does is set a default parameter of gretting to the string
'hello world'. The next step is plug this into our client.js file so it can
actually be used in browser. Modify your cleint.js file to look something like
this:
```javascript
var Backbone = require('backbone');
var Note = require('./js/notes/Note');

var note = new Note();
console.log(note.get('noteBody'));
```
If you build using browserify and open this up in a browser the dev console should
have the string 'hello world' printed in it. The get and set methods are the one of
the ways that you can access properties of a backbone model. They both function in
the same way that the express app.get and app.set methods do. The get
takes the name of the parameter that you want the value of and the set method 
take the name of a paramatere and a vaue to set it to. Both of these can be 
also be accessed using dot notation, although this occasionally leads to unexpected
results. It's usually best to use the get and set methods when possible. 

Now, that console.log line is looking a little long and I need a flimsy excuse
to demonstrate Backbone model methods. Change your FristModel.js file to contain
something like this:
```javascript
//Note
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    noteBody: 'hello world'
  },
  displayNote: function() {
    window.console.log(this.get('noteBody'));
  }
});
```
This new code demonstrates a few new concepts, when in first layer functions in a 
Backbone model this refers to the model itself, not the function. Second we can
add methods to Backbone model like we would any other javascript object. Also,
if you want to be able to call global methods like console.log you actually 
have to refer to window.console.log. This is due to Backbone scoping which doesn't
give access to globals unless it's explicitly told to. In many cases you can
actually just call console.log but getting in the habbit of calling window.console.log
will save a lot of headache in the future.
