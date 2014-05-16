# AJAX

Now that we've built a REST API, and tested it with our "headless" superagent tests,
we can also access the API with JavaScript from a web browser. 

AJAX is a term coined by
[Jesse James Garret](http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/)
in 2005 to describe the technology stack that enables [Single Page Applications](http://singlepageappbook.com/goal.html).
It stands for "Asynchronous JavaScript And XML". 

Now, most people actually tend to send JSON back and forth, more than XML, but
saying "AJAJ" is kind of silly &hellip;so we've stuck with AJAX.

The Asynchronous part of the acronym refers to the fact that we can send data
to the server from the browser, and thanks to the brower's JavaScript event loop,
we can have function executed later when the server returns data.

## A basic AJAX request in the Browser JavaScript Console

Make sure your notes app is running: `grunt serve` or `node server.js`

```javascript
request = new XMLHttpRequest();
request.open('GET', '/api/v1/notes', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400){
    // Success!
    data = JSON.parse(request.responseText);
    console.log(data);
  } else {
    // We reached our target server, but it returned an error
    console.log("there was an error with the server: " + request.status)
  }
};

request.onerror = function() {
  // There was a connection error of some sort
  console.log("There was an error with the request's connection.");
};

request.send();
```

## A jQuery AJAX request in the Browser JavaScript Console

Make sure your notes app is running: `grunt serve` or `node server.js`

```javascript
var data = '';

$.ajax({
  url: '/api/v1/notes',
  data: data,
  success: function(data) {
    data.forEach(function(element) {
      $('body').append('<p>' + element.noteBody + '</p>');
    });
  },
  dataType: 'json'
});
```

## Integrating jQuery, Browserify, and AJAX

You'll need to set up your notes app with Browserify, grunt initConfig, etc.
I've chosen `client.js` as the file the Browserify will bundle my app/js into.

```html
<!-- app/index.html -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>jQuery Browserify Ajax Demo</title>
</head>
<body>
  <ul id="notes"></ul>
  <script src="client.js" charset="utf-8"></script>
</body>
</html>
```

```javascript
// app/js/ajax.js
$ = require('jquery');

var data = '';

$.ajax({
  url: '/api/v1/notes',
  data: data,
  success: function(data) {
    data.forEach(function(element) {
      $('#notes').append('<li>' + element.noteBody + '</li>');
    });
  },
  dataType: 'json'
});
```
