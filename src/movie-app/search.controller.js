angular.module('movieApp')
  .controller('SearchController', SearchController);

SearchController.$inject = [ '$location' ];

function SearchController($location) {
  var vm = this;

  vm.search = searchMovie;

  function searchMovie() {
    if(vm.query) {
      $location.path('/results').search('q', vm.query);
    }
  }
}
