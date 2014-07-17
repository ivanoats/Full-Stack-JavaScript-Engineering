Backbone Views
==================
The next imprtant component ina  backbone app is the views/templates.
These dictate how the data from the models are actually displayed.
Each backbone component is actually composed of two different pieces.
First, the template, which is usually a special kind of html file that
allows you to run javascript code in it. Second, the actual view object
that tells backbone how to actually render that html template. So the
first step is going to be to make directories to contain both our views
and our templates `mkdir app/js/first-model/templates && mkdir app/js/first-model/views`.

Next we have to actually install the templating engine and tell browserify
how to talk to it. I prefer <a href="http://handlebarsjs.com/">handlebars</a>
for my templating engine. It's easy to understand and surprisingly powerful.
We're going to actually install the browsify transfor hbsfy which is a browserify
pluggin used to render hbs templates. `npm install --save-dev hbsfy`. Then change
your browserify task in your Gruntfile.js to look like this:
```javascript
browserify: {
  dist: {
    files: 'app/**/*.js',
    dest: 'dist/client.js',
    options: {
      transform: ['debowerify', 'hbsfy']
    }
  }
}
```
This tells browserify to run the appropraite files through hbsfy which processes
the handlebars specific lines. For our FirstModel the template is going to be very
simple. Create a file called simpleView.hbs in app/js/first-model/templates that
contains the following:
```javascript
<h1>{{greeting}}</h1>
```
The handlebars templates contain html code with javascript executed in {{}} blocks.
In our case we just want to display the greeting of the model we are currently 
rendering.

Next create a file named SimpleView.js in app/js/first-model/views/ with the 
following code:
```javascript
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName: 'div',

  initialize: function() {
    this.render();
  },

  render: function() {
    var template = require('../templates/simpleTemplate.hbs');
    this.$el.html(template(this.model.attributes));
    return this;
  }
});
```
Alright, there's quite a bit going on in this file. First, we pull in backbone
and jquery then we have to set backbone's internal reference to jquery to the
jquery library we pulled in. This is something specific to browserify and it 
isn't necessary with other backbone impletmentations. Inside of our view object
we first have a tagName. This is the tag that our entire view will be wrapped it.
It could easily be a li element or a section or really any html tag that we want.
For simplicity, I have chosen a div tag. Next, the initialize function gets called
whenever a new instance of this view is created. For this view we really only want
to render the view internally, so we call the render function. In the render
function we first pull in the template that we created earlier and set it 
to a variable named(surprise) template. Often you will see this template saved to
a parameter of the view object rather than a variable in the render function but
this pattern doesn't work with browserify. The next line is the real meat of the 
view. Each view has an el element that contains all of the html for the view. The
$el lets us take advantage of jQuery functions such as the .html function. Whenever
we render something to the DOM this is the element we use to do it. In this case
we're passing the attributes of our model to the template we defined and rendering
it as html. The last step is to return the copy of the view that we're currently 
working on. This updates the reference to the current view after we're done 
manipuating it.

After we create our view the next step is to actually render it to the dom. First
add the following line in the body tag of index.html(make sure you edit the one in
app and not the one in dist).
```html
<div id="backbone-content"></div>
```
Next edit your client.js file to look like this:
```javascript
var $ = require('jquery');
var FristModel = require('./first-model/FirstModel');
var SimpleView = require('./first-model/views/SimpleViewi');

var firstModel = new FirstModel();
var simpleView = new SimpleView({model: firstModel});

$('#backbone-content').append(simpleView.el);
```
Now if we build this and open it in the browser we should see 'hello world' in large
friendly letters(friendliness may vary). Notice that when we create the view that
we pass our instance firstModel to it as a model paramater. This is so we can 
reference this.model from within the view. When our view is created it automatically
renders it as defined in the initialize function and then we can just append it
to our backbone-content div and it'll be loaded in the dom.

Well, that's it on views for now.
