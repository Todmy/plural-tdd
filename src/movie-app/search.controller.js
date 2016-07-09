angular.module('movieApp')
  .controller('SearchController', SearchController);

SearchController.$inject = [ '$location', '$timeout' ];

function SearchController($location, $timeout) {
  var vm = this;

  vm.search = searchMovie;
  vm.keyup = keyup;
  vm.keydown = keydown;

  function searchMovie() {
    keydown();
    if(vm.query) {
      $location.path('/results').search('q', vm.query);
    }
  }

  function keyup() {
    vm.timeoutFn = $timeout(searchMovie, 1000);
  }

  function keydown() {
    $timeout.cancel(vm.timeoutFn);
  }
}
