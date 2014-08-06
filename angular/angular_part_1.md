Angular, Part 1: Why Choose Angular?
=========================================
Angular has a lot of advantages over other client side Javascript frameworks.
Here are a handful of reasons that when building an app I turn to Angular first. 

Flexibility
-----------------
It's possible to take almost any portion of Angular and use it on its own. 
For instance, my front end may not need a full router with the ability to access 
a REST api. Maybe I just need a single two way data binding on a single view
and don't want the overhead of a full framework. This is a possiblity with 
Angular but not with frameworks like Ember. 

Testability
-------------------
Angular was built from the ground with testing in mind. Angular's use of 
dependency injection makes it easy to replace any functionality with a mock
or stub. This makes it easier to test a very specific piece of the application
and not the entire framework or app.

Customizability
----------------------
The other advantage of Angular's dependecy injection is the ability to 
replace any piece of the framework. Any moving piece of Angular can be 
replaced simply by dependency injecting a custom peice of code or a third 
party piece of code instead of the pieces that ship with Angular.

Easy-to-Learnability
----------------------------
The learning curve on Angular is very gentle. A programmer can start out
with just a handful of built in directives and some simple controller functions
and add on the more advanced bits as needed. Unlike frameworks that require conventions
in order to operate, Angular lets a developer pick his or her own conventions. 
This can potentially be both a curse and a blessing but it jives well with
my particular learning and coding style. Also, Angular does not require a seperate
data model but can use plain old Javascript objects. This means that data
retrieved from an external source (such as a server) does not have to be converted
to an Angular only model structure before Angular can start using it 
and there are no new data models and functionality to learn.

It-Stil-Just-Worksability
----------------------------
Despite Angular's flixible and customizable nature, all of the pieces work
well with each other. A controller can easily access the view, a view can
easily save new data to the model through the controller and routing is as simple as specifying
a view, a controller and a url. The only part that has to be explicitly defined
by the programmer is the interaction with the server/REST api. I actually
view this as an advantage because not all problems lend themselves well to the 
GET/POST/PUT/DELETE pattern for a single resource. I often find myself needing
just a single end point for a resource and Angular allows me to make that
decision.

For me, Angular is a framework that places an emphasis on modularity, an 
iterative learning approach and fine grain testing. As a Node developer I feel
at home while working with Angular. That said, there are always trade offs and
the Rails developer in me wants conventions and structure but I prefer being
able to establish them for myself rather than have someone else decide for me.
