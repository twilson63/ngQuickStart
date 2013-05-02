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