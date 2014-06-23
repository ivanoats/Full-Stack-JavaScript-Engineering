Getting angular to talk to the basic/jwt authentication scheme described 
<a href="#">here</a> is fairly simple. It essentially involves two parts: first,
getting the JSON Web Token from the signin route and two, adding the jwt
response as a browser cookie. Assuming a bower/browserify setup, run the following
from the root of the app directory. `bower install angular angular-route angular-base64 angular-cookies --save`

The angular package provides the angular base, the angular route provides
angular routing, the angular-base64 allows base64 encryption of the basic auth
auth(which passport expects) and angular-cookies allows browser cookies to be set.

This app is oging to assume that all the angular client side code will reside in
/app and will be run through browserify into a /dist or /build directory. The app
folder will have the following folders: views, js, js/controllers and possibly a
bower_components folder as well. All of the controllers and other components
will be drawn into a file named app.js in app/js. The browserify 'compiled' file will be 
called client.js and this will included into an index.html that gets copied over
by the grunt build task. The index.js file should look something like this:
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Notes Angular</title>
  </head>
  <body>
    <div ng-app="notesApp">
      <div ng-view></div>
    </div>
    <script src="client.js"></script>
  </body>
</html>
```
The index.html is pretty simple, all it does is load the client.js file and provide a 
a div for the app and one for the view. The app.js that browserify uses to create the
client.js will look like this:
```
require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var notesApp = angular.module('notesApp', ['ngRoute', 'base64', 'ngCookies']);

require('./controllers/notesController')(notesApp);
require('./controllers/usersController')(notesApp);

notesApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/notes', {
      templateUrl: 'views/notes.html',
      controller: 'NotesController'
    })
    .when('/signin', {
      templateUrl: 'views/signin.html',
      controller: 'SigninController'
    })
    .otherwise({
      redirectTo: '/signin'
    });
}]);
```
This code won't actually run as is, the controllers and the view have yet to be added but
this is the overall structure of the app. It creates our notesApp object and then passes
the notesApp object to the controller files to add the users and notes controllers. Then 
the /notes and /signin route are added to the notesApp with signin as the default.

The next step is to create the signin controller and view. First the view which should be located
in app/views/signin.html and should look something like this:
```
<div ng-controller="SigninController">
  <h3>Sign In</h3>
  <label>Email</label>
  <input type="text" ng-model="user.email">
  <label>Password</label?
  <input type="password" ng-model="user.password">
  <button ng-click="signin()">Sign In</button>
</div>
```
This view is bound to the SigninController controller. This view contains an email field and
a password field and a button that when clicked runs the signin method of the controller.
Pretty simple as far as views go. Now, it's time to create the SigninController, which
will be located at app/controllers/signinController.js and should contain the following code:
```
module.exports = function(app) {
  app.controller('SigninController', function($scope, $http, $base64, $cookies, $location) {
    $scope.signin = function() {
      $http.defaults.headers.common['Authentication'] = 'Basic ' + $base64($scope.user.email + ':' + $scope.user.password);
      $http({
        method: 'GET',
        url: '/api/v1/users',
      }).success(function(data) {
        $cookies.jwt = data.jwt;
        $location.path('/notes');
      }).error(function(data) {
        console.log(data):
      });
    }
  });
}
```
This controller really only contains the singin function which has two parts. First the controller
sets the authentication header for the request. Of note is that passport basic authentication actually
expects the basic auth to be base64 encoded. While this doesn't actually provide a secure means of
transportation and isn't a replacement for https, it does prevent the password from being transported
in the clear. The next portion of the signin function sends the request to the singin url and 
on success will set the response jwt to a browser cookie using the $cookie library. After setting
the cookie it redirects to the /notes path. Which means, that the next file to create is the notesView.html
in app/views/notesView.html
```
<div ng-controller="NotesController"> 
  <h3>Notes</h3>
  <div ng-repeat="note in notes">
    <p>{{note.noteBody}}</p>
  </div>
</div>
```
The notes view is simple, all it does is display the note body for each note. The next step is to
add the note controller in app/controllers/notesController.js
```
module.exports = function(app) {
  app.controller('NotesController', function($scope, $http, $cookies) {
    $http.defaults.headers.common['jwt'] = $cookies.jwt;
    $http({
      method: 'GET',
      url: '/api/v1/notes'
    }).success(function(data) {
      $scope.notes = data;
    }).error(function(data) {
      console.log(data);
    });
  });
}
```
This controller once again sets a header but this time it is the JWT that was received after successfully
authenticating and saved to a browser cookie. This does assume that the server side api can read the
jwt from the headers and not the body of the request. Which should be as simple as changing the line 
in jwtauth from `var token = req.body.jwt_token` to `var token = (req.body && req.body.jwt_token) || req.headers.jwt`
and then it should authenticate and send back an array of notes.
