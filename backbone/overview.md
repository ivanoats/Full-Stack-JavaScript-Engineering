Backbone Overview
============================
Backbone is a clientside mv* javascript web framework. In fact it's really the 
oldest client side mv* javascript framework. The initial release for backbone was 
back in the ancient times of 2010. Backbone ushered in the new era of web 
applications with an mv* framework that sits in the browser and communicates to a server that is primarily in charge of data persistence.

Backbone is loosely based off of the <a href="http://blog.codinghorror.com/understanding-model-view-controller/">Model/View/Controller pattern</a> which was created by
smalltalk developers and became massively popular for web development due primarily
 to the <a href="http://rubyonrails.org/">Ruby on Rails framework</a>. Backbone and
 many other frameworks like it tend to have an explicit model and view and something
 of their own design that roughly approximates a controller.

Model
--------------
The Backbone model provides the interaction with the data of a Backbone web 
application. It is the way that Backbone communicate with a server and provides
both built in and programmer defined methods for manipulating data.

View
---------------
The backbone views define the way that a Backbone application displays the data 
gathered from the models. This is the way that Backbone interacts directly with
 the browser. The main difference between Backbone and other mv* client side 
javascript frameworks is that Backbone doesn't have built in interactions between 
the view and the model. All interactions have to be defined by the programmer.

And the rest
------------------
The last major component in Backbone is the router. Backbone routers define what
happens when a user navigates to a certain route. It really defines the 
interactivity of the application. It acts both as a traditional router and in many 
cases a controller. The backbone router will determine which models a route should
grab data from and which views should be rendered to the screen.

Now you may be asking yourself "WTF would I want to learn Backbone when EmbAngular 
has all the magics?" Well, Ember/Angular have do make it very easy to create a 
single page web application but it does a lot of the interaction under the hood
and learning one doesn't really give that much insight into the other. Backbone 
provides a great learning platform because it doesn't provide the programmer with
a lot of magic. Once a developer learns Backbone it makes it very easy to learn
another more complex framework.
