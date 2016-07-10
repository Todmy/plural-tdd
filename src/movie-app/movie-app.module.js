(function() {
  'use strict';

  angular.module('movieApp', ['ui.bootstrap' , 'ngRoute', 'omdb', 'movieCore'])
    .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'movie-app/home.html',
      controller: 'HomeController as vm'
    })
    .when('/results', {
      templateUrl: 'movie-app/results.html',
      controller: 'ResultsController as vm'
    })
    .otherwise({
      redirectTo: '/'
    })
  }
})();
