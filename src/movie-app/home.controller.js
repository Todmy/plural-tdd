(function() {
  'use strict';
  angular.module('movieApp')
    .controller('HomeController', HomeController);

    HomeController.$inject = [ '$interval', 'omdbApi', 'PopularMovies' ];

    function HomeController($interval, omdbApi, PopularMovies) {
      var vm = this;
      var idx = 0;

      vm.activate = activate;

      vm.activate();

      function activate() {
        return PopularMovies.get()
          .then(function(data) {
            vm.results = data;
            findMovies(vm.results[0]);
            vm.interval = $interval(function() {
              ++idx;
              findMovies(vm.results[idx % vm.results.length]);
            }, 5000);
          })
      }

      function findMovies(id) {
        return omdbApi.find(id)
          .then(function(data) {
            vm.result = data;
          })
      }
    }
})();
