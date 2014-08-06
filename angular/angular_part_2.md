Angular Part 2, Getting Started With Angular
=============================================
The easiest way to get started with Angular is to use a <a href="http://yeoman.io/">Yeoman generator</a>. The
code and doccumentation for the Angular generator can be found <a href="https://github.com/yeoman/generator-angular">Here</a>.
While I usually don't reccommend using generators it is a good way to see how the 
moving pieces of Angular interact without having to worry about the file structure
or naming conventions of the app. If you don't have npm and node installed look for 
instructions for your operating system <a href="http://nodejs.org/">on their website</a>

The first step is to install Yeoman and the angular generator globally, along with
bower and the grunt cli which are used for front end dependencies and build tools respectively:
`npm install -g yo generator-angular bower grunt-cli`. Next create an empty directory and
change into it. Then run `yo angular`, which will ask you a series of questions.
When first starting out I would answer no to using sass/compass unless you already
have it installed and have used it before. Answer no the bootstrap, primarily because
Angular already adds a lot of classes and html bits and having the bootstrap classes
in there as well will only make it more difficult to learn. The last question
asks what other angular parts should be installed, get rid of everything except routes.

The generator will then create a full working Angular app. To run the app, use the command
`grunt serve` which will build all of the assets, start the app and if possible will open the
index page in your browser.

There are three major moving parts to pay attention to in this generated app. First, 
there's the app, located in app/scripts/app.js. This file contains the base level app
and the routing information using $routeProvider. Each .when statement contains the
url to watch for, and the view and controller to render when a user navigates to that
url. The next parts to look for are the views and controllers. The view are located
app/views and the controllers are located in app/controllers. To create a new view use the
command `yo angular:view <name of your view>` this will create a .html file in app/views
with the specified name. To create a new controller just use `yo angular:controller <name of controller>`.
This will create a basic controller in app/controllers with the specified name.

These are the minimum three pieces needed to create a single page web application. A router, some views 
and some controllers. Angular doesn't have a specific model construct as it just uses
plain old javascript objects. Beyond these basics Anuglar has a host of features
designed to increase the modularity and reusability of your code. The most important
of these features include filters for transforming data or information in views (such as displaying 5.2 as $5.20).
There are services for performing tasks across controllers, views and any other place that
needs some reusable code. Finally, there are directives, which allow programmers to write portable
code that interacts directly with the DOM. Documentation on each of these mentioned
pieces of code can be found at the <a href="https://angularjs.org/">official Angular website</a>
and there are Yeoman generators for each.

That should get you started with Angular, obviously this doesn't inlcude everything or how
to actually build full web application. Part 3 will be on how to find more information about
Angular and how to stay up to date on the latest Angular trends and developments.

