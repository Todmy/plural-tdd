(function() {
  'use strict';
  angular.module('movieApp')
    .controller('ResultsController', ResultsController);

  ResultsController.$inject = [ 'omdbApi', '$location' ];

  function ResultsController(omdbApi, $location) {
    var vm = this;

    vm.activate = activate;
    vm.getQuery = getQuery;

    vm.activate(vm.getQuery());

    function activate(query) {
      return omdbApi.search(query)
      .then(function(data) {
        vm.results = data.Search;
      }, function(err) {
        vm.errorMessage = err;
      });
    }

    function getQuery() {
      return $location.search().q;
    }
  }
})();
