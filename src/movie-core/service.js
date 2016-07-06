(function() {
  'use strict';
  angular.module('movieCore', ['ngResource'])
    .factory('PopularMovies', PopularMovies);

  PopularMovies.$inject = [ '$resource' ];

  var token = 'todmy';

  function PopularMovies($resource) {
    return $resource('popular/:movieId', { movieId: '@id' }, {
      update: {
        method: 'PUT',
        headers: { 'authToken': token }
      },
      get: {
        method: 'GET',
        headers: { 'authToken': token }
      },
      query: {
        method: 'GET',
        headers: { 'authToken': token }
      },
      save: {
        method: 'POST',
        headers: { 'authToken': token }
      },
      remove: {
        method: 'DELETE',
        headers: { 'authToken': token }
      }
    });
  }
})();
