# Learning Ember via the Ember CLI

Here is why I choose to use Ember, and the quickest way to get started.

## Why Ember?

- You're going to either create your own framework or use someone else's. The
Ember community has thought about a lot of solutions already, saving you time
and money.
- Documentation: Ember used to have a reputation for poor documentation, but
now, it's well know that it's much better, (I'm looking at you, Angular). Start
with the [Ember Guides](http://emberjs.com/guides/) and I will give you more
resources later.
- Yehuda Katz. A core contributor to jQuery, Rails, and other high profile
projects, he is known for high quality software, and sticking around for a long
time to see the project grow. And for the Rails folks in the room, Ember Data
and ActiveModel Serializers are a match made for each other.
- Ember embraces web standards. Google, and Angular, has a reputaiton for making
up their own way of doing things. Ember uses Handlebars, ES6 modules, Web Components, etc.
You know if another standard comes out that it will be adoped by Ember.
- Ember CLI. The team is really focused on supporting a quick development
workflow through tools like Ember CLI. This cuts out a lot of boilerplate.
- For me, Ember is a natural extension of Backbone, without all the setup.
and wiring shit up. There is a clear seperation of concerns which makes it ideal
for a large-scale app.
- [Convention over Configuration](http://en.wikipedia.org/wiki/Convention_over_configuration) decreases the number of design decisions you have to make.

## Why not Angular?

I'm not trying to single out Angluar in particular, other than that the class I
am preparing this blog post for is presenting both. I don't have any experience
with Angular, so these are all quotes below:

<blockquote>"kills the DOM...various ng-attribute references cluttered the page around 
and this was mixed with what is called "mustache-esque" template bindings."
</blockquote>
  [source](http://ryantablada.com/post/why-i-chose-ember-js)
<blockquote>Angular's creator describes it as a metaframework - a framework for
creating your application's framework. Thus, if you get two different Angular
apps, their internals will look completely different.

This is not the approach Ember takes, where you buy in to the framework's
conventions. So, one could argue that once you learn the conventions, you'll
spend much less time on boilerplate writing a new Ember app than a new Angular
app. This doctrine also belongs to Rails, and it's worked out pretty well for
them.
</blockquote>
[source](http://discuss.emberjs.com/t/how-do-we-beat-angularjs-in-the-developers-mindset/3948/3)

To dive deeper, read [A Five Part Blog Post Series Comparing Angular and Ember](http://www.benlesh.com/2014/04/embular-part-1-comparing-ember-and.html)
and [Backbone, Angular, or Ember](http://www.100percentjs.com/backbone-or-angular-or-ember-here-is-my-choice-and-why/).

Angular vs Ember [slides](https://docs.google.com/presentation/d/1e0z1pT9JuEh8G5DOtib6XFDHK0GUFtrZrU3IfxJynaA/preview?slide=id.g177e4bd2b_0148).

## Prerequisites

You'll need the following modules if you don't have them already

```
npm install -g phantomjs bower
```

## Installation

First step is to install the command line tool globally:

```
npm install -g ember-cli
```

Then, install the [Ember Chrome Extension](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi).

## Kicking the Tires

Examine carefully the output of the help option for the `ember` command.
```
ember --help
```

## Our First App Setup

```
ember new emberNotes
cd emberNotes
ember serve
```

Take a look (in your editor) at `app/templates/application.hbs`. Go ahead and 
change the `h2` element to "Welcome to Notes" or something similar. The 
`{{outlet}}` tag is where our content will end up.

# Generating More

Browse to the [List of Ember Generators](https://github.com/cavneb/loom-generators-ember-appkit/tree/master/loom/generators).

```
ember g model note
ember g controller notes
ember g template note
ember g route index
```

Edit `app/routes/index.js`:

1. Include a model attribute of the route, that points to:
2. A dummy data variable

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
      return data.result;
    }
});

var data = {
  "status": "ok",
  "result": [
    { noteBody: "Twilight Sparkle"},
    { noteBody: "Applejack"},
    { noteBody: "Fluttershy"},
    { noteBody: "Rarity"},
    { noteBody: "Pinkie Pie"},
    { nodeBody: "Rainbow Dash"}
  ]
};

```

And, in `app/templates/index.hbs`:

```
{{#each this}}
  <li>{{noteBody}}</li>
{{/each}}
```

Now, let's add images to your data. Add a picture attribute, something like this:

```
"result": [
    {
      noteBody: "Twilight Sparkle",
      picture: "http://img4.wikia.nocookie.net/__cb20140420032412/mlp/images/thumb/e/e0/Twilight_Sparkle_after_drying_herself_S1E03.png/209px-Twilight_Sparkle_after_drying_herself_S1E03.png"
    },
    {
      noteBody: "Applejack",
      picture: "http://img3.wikia.nocookie.net/__cb20121029101939/mlp/images/thumb/e/ee/Applejack_proud_of_herself_S1E01.png/209px-Applejack_proud_of_herself_S1E01.png"
    },
   ]
```

and in your `index.hbs`

```
{{#each this}}
  <li>
    <img {{bind-attr src="picture"}} />
    {{noteBody}}
  </li>
{{/each}}
```

Now, with more Ponies!

## More on Ember CLI

- [Ember CLI docs](http://iamstef.net/ember-cli/)
- [Prototyping an Ember App in 20 minutes](https://www.youtube.com/watch?v=Hm8XsgKT0Qw)

## Top Ten Resources for Staying Up to Date on Ember

- http://emberjs.com/guides/
- http://emberwatch.com
- https://emberflare.com
- http://www.embercasts.com
- http://www.confreaks.com/events/emberconf2014
- http://emberweekly.com
- https://www.codeschool.com/courses/warming-up-with-ember-js
- http://pluralsight.com/training/courses/TableOfContents?courseName=fire-up-emberjs
- https://courses.tutsplus.com/courses/lets-learn-ember
  


