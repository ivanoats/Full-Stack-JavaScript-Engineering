# A Conversation about REST

_adapted from an original post by [Ryan Tomayko](http://tomayko.com/writings/rest-to-my-wife)_

__Brother:__ Hey, I have a question for you… Who is “Roy Fielding”?

__ME:__ Some guy. He's smart.

__Brother:__ Oh? What did he do?

__ME:__ He helped write the first web servers, that sent documents across the Internet… and then he did a ton of research explaining why the web works the way it does. His name is on the specification for the protocol that is used to get pages from servers to your browser.

__Brother:__ How does that work, anyway?

__ME:__ The web?

__Brother:__ Yeah.

__ME:__ Hmm. Well, it's all pretty amazing really. And the funny thing is that it's all very undervalued. The protocol I mentioned, that he helped write, HTTP, it's capable of all sorts of neat stuff that people ignore for some reason.

__Brother:__ You mean “http” like the beginning of what I type into the browser?

__ME:__ Yeah. That first part tells the browser what protocol to use. That stuff you type in there is one of the most important breakthroughs in the history of computing.

__Brother:__ Why?

__ME:__ Because it is capable of describing the location of something anywhere in the world from anywhere in the world. It's the foundation of the web. You can think of it like GPS coordinates for knowledge and information.

__Brother:__ For web pages?

__ME:__ For anything really. That guy, Roy Fielding, he talks a lot about what those things point to in that research I was talking about. The whole world wide web is built on an architectural style called “REST”. REST provides a definition of a “resource”, which is what those things point to.

__Brother:__ A web page is a resource?

__ME:__ Kind of. A web page is a “representation” of a resource. Resources are just concepts. URLs--those things that you type into the browser...

__Brother:__ I know what a URL is..

__ME:__ Oh, right. Those URLs tell the browser that there's a concept somewhere. A browser can then go ask for a specific representation of the concept. Specifically, the browser asks for the web page representation of the concept.

__Brother:__ What other kinds of representations are there?

__ME:__ Actually, representations is one of these things that doesn't get used a lot. In most cases, a resource has only a single representation. But we're hoping that representations will be used more in the future because there's a bunch of new formats popping up all over the place.

__Brother:__ Like what?

__ME:__ Hmm. Well, there's this concept that people are calling “Web Services” or "APIs". It means a lot of different things to a lot of different people but the basic concept is that machines could use the web just like people do.

__Brother:__ Is this another robot thing?

__ME:__ No, not really. I don't mean that machines will be sitting down at the desk and browsing the web. But computers can use those same protocols to send messages back and forth to each other. We've been doing that for a long time but none of the techniques we use today work well when you need to be able to talk to all of the machines in the entire world.

__Brother:__ Why not?

__ME:__ Because they weren't designed to be used like that. When Fielding and his buddies started building the web, being able to talk to any machine anywhere in the world was a primary concern. Most of the techniques we use at work to get computers to talk to each other didn't have those requirements. You just needed to talk to a small group of machines.

__Brother:__ And now you need to talk to all the machines?

__ME:__ Yes - and more. We need to be able to talk to all machines about all the stuff that's on all the other machines. So we need some way of having one machine tell another machine about a resource that might be on yet another machine.

__Brother:__ What?

__ME:__ Let's say you're talking to our sister and she wants to borrow Great Grandma's silver water jug or something. But you don't have it - Mom has it. So you tell our sister to get it from Mom instead. This happens all the time in real life and it happens all the time when machines start talking too. On the Internet, it's called a "redirect".

__Brother:__ So how do the machines tell each other where things are?

__ME:__ The URL, of course. If everything that machines need to talk about has a corresponding URL, you've created the machine equivalent of a noun. That you and I and the rest of the world have agreed on talking about nouns in a certain way is pretty important, eh?

__Brother:__ Yeah.

__ME:__ Machines don't have a universal noun - that's why they suck. Every programming language, database, or other kind of system has a different way of talking about nouns. That's why the URL is so important. It let's all of these systems tell each other about each other's nouns.

__Brother:__ But when I'm looking at a web page, I don't think of it like that.

__ME:__ Nobody does. Except Fielding and handful of other people. That's why machines still suck.

__Brother:__ Ha, what about verbs and pronouns and adjectives?

__ME:__ Funny you asked because that's another big aspect of REST. Well, verbs are anyway.

__Brother:__ I was just joking.

__ME:__ It was a funny joke! but it's actually not a joke at all. Verbs are important. There's a powerful concept in programming and CS theory called “polymorphism”. That's a geeky way of saying that different nouns can have the same verb applied to them.

__Brother:__ I don't get it.

__ME:__ Well.. Take a look at your coffee table. What are the nouns? Laptop, bottle, book, paper. Now, what are some things you can do to all of these things?

__Brother:__ I don't understand what you mean...

__ME:__ You can "get" them, right? You can pick them up. You can knock them on the floor. You can burn them. You can apply those same exact verbs to any of the objects sitting there.

__Brother:__ Okay... so?

__ME:__ Well, that's important. What if instead of me being able to say to you, "get the bottle," and "get the magazine," and "get the book"; what if instead we needed to come up with different verbs for each of the nouns? I couldn't use the word "get" universally, but instead had to think up a new word for each verb/noun combination. "shmet the bottle", "mandle the magazine", "zorp the book"

__Brother:__ Wow! That's weird.

__ME:__ Yes, it is. Our brains are somehow smart enough to know that the same verbs, like GET, can be applied to many different nouns. Some verbs are more specific than others and apply only to a small set of nouns. For instance, I can't drive a cup and I can't drink a car. But some verbs are almost universal like GET, PUT, and DELETE.

__Brother:__ You can't DELETE a cup.

__ME:__ Well, okay, but you can throw it away. That was another joke, right?

__Brother:__ Yeah.

__ME:__ So anyway, HTTP—this protocol Fielding and his friends created—is all about applying verbs to nouns. For instance, when you go to a web page, the browser does an HTTP GET on the URL you type in and back comes a web page.

Web pages usually have images, right? Those are separate resources. The web page just specifies the URLs to the images and the browser goes and does more GETs using the HTTP protocol on them until all the resources are obtained and the web page is displayed. But the important thing here is that very different kinds of nouns can be treated the same. Whether the noun is an image, text, video, an mp3, a slideshow, whatever. I can GET all of those things the same way given a URL.

__Brother:__ Sounds like GET is a pretty important verb.

__ME:__ It is. Especially when you're using a web browser because browsers pretty much just GET stuff. They don't do a lot of other types of interaction with resources. This is a problem because it has led many people to assume that HTTP is just for GETing. But HTTP is actually a general purpose protocol for applying verbs to nouns.

__Brother:__ Cool. But I still don't see how this changes anything. What kinds of nouns and verbs do you want?

__ME:__ Well the nouns are there but not in the right format.

Think about when you're browsing around amazon.com looking for things to buy me for Christmas (*whispers:* VITAMIX!!!) . Imagine each of the products as being nouns. Now, if they were available in a representation that a machine could understand, you could do a lot of neat things.

__Brother:__ Why can't a machine understand a normal web page?

__ME:__ Because web pages are designed to be understood by people. A machine doesn't care about layout and styling. Machines basically just need the data. Ideally, every URL would have a human readable and a machine readable representation. When a machine GETs the resource, it will ask for the machine readable one. When a browser GETs a resource for a human, it will ask for the human readable one.

__Brother:__ So people would have to make machine formats for all their pages?

__ME:__ If it were valuable.

Look, we've been talking about this with a lot of abstraction. How about we take a real example. Imagine you are a teacher - at school you probably have a big computer system, or three or four computer systems more likely, that would let you manage students: what classes they're in, what grades they're getting, emergency contacts, information about the books you teach out of, etc. If the systems are web-based, then there's probably a URL for each of the nouns involved here: student, teacher, class, book, room, etc. Right now, getting the URL through the browser gives you a web page. If there were a machine readable representation for each URL, then it would be trivial to latch new tools onto the system because all of that information would be consumable in a standard way. It would also make it quite a bit easier for each of the systems to talk to each other. Or, you could build a state or country-wide system that was able to talk to each of the individual school systems to collect testing scores. The possibilities are endless.

Each of the systems would get information from each other using a simple HTTP GET. If one system needs to add something to another system, it would use an HTTP POST. If a system wants to replace something in another system, it uses an HTTP PUT, or to do a partial update, it'll hopefully use PATCH. The only thing left to figure out is what the data should look like.

__Brother:__ So this is what software developers work on now? Deciding what the data should look like?

__ME:__ More or less it is in the web development world, thanks almost entirely to the popularity of RESTful web frameworks like Ruby on Rails. 

But this is a very recent change! Just a few years ago, the large majority of developers were busy writing layers of complex specifications for how to access data in a different way that isn't nearly as useful or eloquent. Nouns weren't universal and verbs weren't polymorphic. They basically ignored throwing out decades of real field usage and proven technique and kept starting over with something that looks a lot like other systems that have failed in the past. They used HTTP but only because it let them talk to our network and security people less. It was like  trading simplicity for flashy tools and wizards.

__Brother:__ Ew…Why?

__ME:__ I have no idea.

__Brother:__ But we are done with all that?

__ME:__ We are done. Now, we just tell Rails what we want our data to look like, and it takes care of all of the communication pieces for us. It's a huge boost for productivity!