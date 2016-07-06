(function() {
  'use strict';

  angular.module('omdb', [])
    .factory('omdbApi', omdbApi);

  function omdbApi($http, $q) {
    var baseUrl = 'http://www.omdbapi.com/?v=1&';

    var service = {
      search: searchAll,
      find: findById
    };

    return service;

    ////////

    function httpPromise(url) {
      var deferred = $q.defer();

      $http.get(url)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function() {
        deferred.reject();
      })

      return deferred.promise;
    }

    function searchAll(query) {
      return httpPromise(baseUrl + 's=' + encodeURIComponent(query));
    }

    function findById(id) {
      return httpPromise(baseUrl + 'i=' + id);
    }
  }
}());
