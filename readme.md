# ngQuickstart (with brackets)

## Setup

* Install brackets (http://brackets.io/)
* Install Emmet Extension (https://github.com/emmetio/emmet/downloads)
* Install Nodejs (http://nodejs.org)
* Open console

``` sh
mkdir tsearch
cd tsearch
npm install bower -g
bower init
bower install jquery bootstrap.css angular-resource --save
touch index.html
```

* Open Brackets or your favorite editor
* Open the index.html file and paste the snippet below

``` html
<!doctype html>
<html>
<head>
  <title>Twitter Search</title>
  <link rel="stylesheet" href="/components/bootstrap/css/bootstrap.css">
</head>
<body>
  <div class="container">
    <h1>Twitter Search</h1>
    <input type="text">
    <button class="btn">search</button>
    <ul>
      <li></li>
    </ul>
  </div>
  <script src="/components/jquery/jquery.js"></script>
  <script src="/components/angular/angular.js"></script>
  <script src="/components/angular-resource/angular-resource.js"></script>
</body>
</html>
```

or

``` html
<!doctype html>
html>head>title{Twitter Search}+link[href="/components/bootstrap/css/bootstrap.css"]^body>.container>h1{Twitter Search}+input+button.btn{search}+ul>li^^script[src="/components/jquery/jquery.js"]+script[src="/components/angular/angular.js"]+script[src="/components/angular-resource/angular-resource.js"]
```

* And press tab to invoke emmet

## Exercise 1 - Simple Binding Test

In this exercise, we want to do a simple binding test to confirm we have angularjs configured correctly.

In the body of your html document, add the following html after the `<button>` tag:
  
``` html
<h3>Results for: <span ng-bind="query"></span></h3>
```

Next, lets add an angular `ng-model` attribute to the `input` element and assign the string "query", like this:

``` html
<input type="text" ng-model="query">
```

Lastly, we need to bootstrap our angularjs app, lets use the manual method.

To manually bootstrap an AngularJS app we need to create a `<script>` element after the last script element, 
or just before the `</body>` element.

``` html
<script>
  angular.element(document).ready(function() {
    angular.bootstrap(document);
  });
</script>
```

Here is a full view of your html file.

``` html
<!doctype html>
<html>
<head>
  <title>Twitter Search</title>
  <link rel="stylesheet" href="/components/bootstrap/css/bootstrap.css">
</head>
<body>
  <div class="container">
    <h1>Twitter Search</h1>
    <input type="text" ng-model="query">
    <button class="btn">search</button>
    <h3>Results for: <span ng-bind="query"></span></h3>
    <ul>
      <li></li>
    </ul>
  </div>
  <script src="/components/jquery/jquery.js"></script>
  <script src="/components/angular/angular.js"></script>
  <script src="/components/angular-resource/angular-resource.js"></script>
  <script>
    angular.element(document).ready(function() {
      angular.bootstrap(document);
    });
  </script>
</body>
</html>
```

Open up a browser and confirm you have the data-binding working by typing in the input box.

Did you get it working?  If so?  GREAT JOB!, if not look for syntax errors. 

You may want to install [jshint](#jshint) and see if you have any syntax errors. 

The view layer of Angular is made up of `HTML Templates` and `directives`, angular 
is like an html compiler, it will compile the html and execute any directives.  
In the above example, we added two directives (ng-model, ng-bind).

## Exercise 2 - Working with directives

As we demonstrated above, we are using the actual html file as our dynamic template, 
there is no need for haml, ejb, dust, or mustache.  
AngularJS uses the html markup in a declarative way to build and render your views.  
As with all templates, we need a way to map data to the view template.  

AngularJS uses attributes on the html element which are called directives.  

> Actually, a directive may be an actual `element`, `class name` or `attribute`.  

For now, we will stick to attributes.

In this exercise, we will use the `ng-repeat` directive to display a list of results. 

On the `<li>` element lets add an attribute called `ng-repeat` like so:

``` html
<li ng-repeat="item in [1, 2, 3, 4]">
  <span ng-bind="item"></span>
</li>
```

Lets view the result in the browser:

``` sh
open index.html
```

You should see four line items, GREAT JOB!

The ng-repeat directive is one of the most powerful built-in directives in Angular,
and we will use it in all of our exercises.

# Exercise 3 - Controllers 

create a file in the tsearch directory called app.js,
add the following script element just before the `</body>` tag:

``` html
<script src="app.js"></script>
```

Next, open `app.js` in your editor and add the following function to the `app.js` file:

``` js
(function() {
  'use strict';

  window.MainCtrl = function ($scope) {
    $scope.items = ['one', 'two', 'three', 'four'];
  };
  
})();
```

modify the ng-repeat directive to loop through items on index.html.

``` html
<li ng-repeat="item in items">
```

lastly we need to create a controller directive on the container div:

``` html
<div class="container" ng-controller="MainCtrl">
```

And reload your browser, you should see a list of items with each line spelled out.  
one, two, three, four

> GREAT JOB!

If not compare your code to the following:

``` html
<!doctype html>
<html>
<head>
  <title>Twitter Search</title>
  <link rel="stylesheet" href="/components/bootstrap/css/bootstrap.css">
</head>
<body>
  <div class="container" ng-controller="MainCtrl">
    <h1>Twitter Search</h1>
    <input type="text" ng-model="query">
    <button class="btn">search</button>
    <h3>Results for: <span ng-bind="query"></span></h3>
    <ul>
      <li ng-repeat="item in items">
        <span ng-bind="item"></span>
      </li>    
    </ul>
  </div>
  <script src="/components/jquery/jquery.js"></script>
  <script src="/components/angular/angular.js"></script>
  <script src="/components/angular-resource/angular-resource.js"></script>
  <script>
    angular.element(document).ready(function() {
      angular.bootstrap(document);
    });
  </script>
  <script src="app.js"></script>
</body>
</html>
```

``` js
(function() {
  'use strict';

  window.MainCtrl = function ($scope) {
    $scope.items = ['one', 'two', 'three', 'four'];
  };
  
})();
```


Ok, so lets break down what we did here.  

We created a global function called `MainCtrl`, and on the argument list we added an argument called $scope.  
You may be wondering where this object is coming from and with good reason, we will get to that shortly.  

Continuing on in the MainCtrl function, you see that we are assigning an array to a key on the $scope object 
called `items`.  

Moving over the `index.html` file, we modified the ng-repeat directive to get its repeater source from the items key.  This is the `model` that we attached to the `$scope` object in our function.  And the last piece of the puzzle is the controller.  We modified the `div.container` with a new attribute called ng-controller and assigned it to the "MainCtrl" function.  The declaration basically creates and assigns a $scope object for all of the directives enclosed in this div to work with.  This is how AngularJS's views consume `model` data.  So you may start to think `MVC`.  

So back to the *magic*, when a ng-controller is created AngularJS creates a `service` or `object` called `$scope` 
for the directives enclosed in the controller template.  Which is all the directives defined inside the 
`<div class="container" ng-controller="MainCtrl">`

When we defined our function, we added the `$scope` (service or object) to our list of arguments.  
The act of adding this argument communicated to AngularJS to inject the controller's `$scope` object 
into our controller function MainCtrl.  This is called: 

## Dependency Injection

Which basically means that you can ask the angular application 
to inject or place objects in your functions when you need them.  
The most common object you inject in your controllers is `$scope`.

Hopefully, you can get a solid sense on how we are wiring our Views (HTML Templates) to our controllers (Javascript 
Functions) to our models (simple array).

## Exercise 4 - Ajax Service

So we have a controller with a simple input form and button and results list.  We now need to take the text from the 
input and make a request to twitter.  Twitter will send us some results back and we want to display them in our list.

First, we need to open our `app.js` file and add a new argument in our MainCtrl function.  We want to ask angular 
to inject the `$http` service into our controller.  

``` js
window.MainCtrl = function ($scope, $http) {
  $scope.items = ['one', 'two', 'three', 'four']
};
```

And now we want to rewrite the function body to capture a search event and assign it to a function that will call 
`http://search.twitter.com/search.json?q=angularjs&callback=JSON_CALLBACK` and assign the results into the 
$scope.items variable.

``` js
  $scope.search = function(query) {
    $http.jsonp('http://search.twitter.com/search.json?q=angularjs&callback=JSON_CALLBACK')
      .success(function(data) {
        $scope.items = data.tweets;
      });
  };
```

Now, we need to wire up the `$scope.search` function to our view (HTML Template).  
All we have to do is add a `ng-click` directive to the `button` element.

``` html
<button class="btn" ng-click="search(query)">search</button>
```

And we have to modify our `ng-bind` attribute in the `span` element enclosed in the `li` element 
to display the text from each tweet.

``` html
<span ng-bind="item.text"></span>
```

Let's refresh our browser and click the search button, you should see some real live tweet results.

> GREAT JOB!

Almost there, we still have one issue remaining.  

We need to take the user entered text in the input element and use it to request a search from twitter.  
Everything is ready to go, all we need to do is modify our http url string to use basic string concatenation 
to include the query text.

``` js
$http.jsonp('http://search.twitter.com/search.json?q=' + query + '&callback=JSON_CALLBACK')
```

> GREAT JOB, we now have a very simple twitter search app using angularjs.

# Exercise 5 - Using some sugar in the html template.

So there are a couple of directives that have some sugar to make things a little bit easier on the eyes. 
Certainly, you do not have to use these aliases if you do not want to, but it may save you some time.

First, the bootstrap method:

``` html
<script>
  angular.element(document).ready(function() {
    angular.bootstrap(document);
  });
</script>
```

Can be replaced by just adding `ng-app` to the body or html element.

``` html
<html ng-app>
```

Second, is to replace ng-bind with the {{model}} symbols.

``` html
<h3>Results for: <span ng-bind="query"></span></h3>
```

Can be replaced with

``` html
<h3>Results for: {{query}}</h3>
```

and

``` html
 <span ng-bind="item.text"></span>
```

Can be replaced with

``` html
  {{item.text}}
```

# What we have so far

index.html

``` html
<!doctype html>
<html ng-app>
<head>
  <title>Twitter Search</title>
  <link rel="stylesheet" href="/components/bootstrap/css/bootstrap.css">
</head>
<body>
  <div class="container" ng-controller="MainCtrl">
    <h1>Twitter Search</h1>
    <input type="text" ng-model="query">
    <button class="btn" ng-click="search(query)">search</button>
    <h3>Results for: {{query}}</h3>
    <ul>
      <li ng-repeat="item in items">{{item.text}}</li>    
    </ul>
  </div>
  <script src="/components/jquery/jquery.js"></script>
  <script src="/components/angular/angular.js"></script>
  <script src="/components/angular-resource/angular-resource.js"></script>
  
  <script src="app.js"></script>
</body>
</html>
```

app.js

``` js
(function() {
  'use strict';

  window.MainCtrl = function ($scope, $http) {
    $scope.search = function(query) {
      $http.jsonp('http://search.twitter.com/search.json?q=' + 
        query + '&callback=JSON_CALLBACK')
      .success(function(data) {
        $scope.items = data.results;
      });
    };
  };  
})();
```

## Exercise 6 - Place the controller into an angularjs module.

Now you might be thinking, ok this is a great demo, but creating global functions is not a best practice and certainly can create some potential issues.  And your right, we have been using the global to not throw too much at you at once and hopefully help you get an idea of what is going on behind the scenes on how the views connect to controllers and models.

But lets put our controller code in an angularjs module, and define that module as our application.  First, we need to create the module and it is very easy: (replace your app.js with the following:)

``` js
(function() {
  'use strict';
  
  angular.module('Twitter', [])
    .controller('MainCtrl', function($scope, $http) {
      $scope.search = function(query) {
         $http.jsonp('http://search.twitter.com/search.json?q=' + query + '&callback=JSON_CALLBACK')
           .success(function(data) {
             $scope.items = data.results;
           });
       };      
    });
```

You can see we are calling the module method from the angular object and passing the name of our application and an empty array, which will address later.  This method returns a module instance, this instance has a controller method that allows us to define the controller.  We are using chaining to call the controller method.

Then we simply call the controller the same name as our declaration and add our function to the angular module.

Great!

Now, we need to go to the html index.html file and assign our newly created module to our `ng-app` directive.  Like so:

``` html
<html ng-app="Twitter">
```

Awesome!  We have just removed all the ugly global function stuff, and your code is now safely wrapped in an angular module.

GREAT JOB!

Here is the final results:

index.html

``` html
<!doctype html>
<html ng-app>
<head>
  <title>Twitter Search</title>
  <link rel="stylesheet" href="/components/bootstrap/css/bootstrap.css">
</head>
<body>
  <div class="container" ng-controller="MainCtrl">
    <h1>Twitter Search</h1>
    <input type="text" ng-model="query">
    <button class="btn" ng-click="search(query)">search</button>
    <h3>Results for: {{query}}</h3>
    <ul>
      <li ng-repeat="item in items">{{item.text}}</li>    
    </ul>
  </div>
  <script src="/components/jquery/jquery.js"></script>
  <script src="/components/angular/angular.js"></script>
  <script src="/components/angular-resource/angular-resource.js"></script>
  
  <script src="app.js"></script>
</body>
</html>
```

app.js

``` js
(function() {
  'use strict';

  window.MainCtrl = function ($scope, $http) {
      $scope.search = function(query) {
    $http.jsonp('http://search.twitter.com/search.json?q=' + query + '&callback=JSON_CALLBACK')
      .success(function(data) {
        $scope.items = data.results;
      });
  };

  };  
})();
``` 


<a name="jshint"></a>

# Using jsHint

jsHint is a linting tool that will scan your javascript file and let you know if you have any syntax errors.

## install

``` sh
npm install jshint -g
```

## run

``` sh
jshint [your js file]
```


