(function() {
  'use strict';

  angular.module('movieApp', ['ui.bootstrap' , 'ngRoute', 'omdb'])
    .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/results', {
      templateUrl: 'movie-app/results.html',
      controller: 'ResultsController as vm'
    })
    .otherwise({
      redirectTo: '/'
    })
  }
})();
