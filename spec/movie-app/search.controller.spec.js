describe('Search Controller', function() {
  var $controller;
  var $location;

  beforeEach(module('movieApp'));

  beforeEach(inject(function(_$controller_, _$location_) {
    $location = _$location_;
    $controller = _$controller_.bind(null, 'SearchController', { $location: $location });
  }));
  it('should redirect to the query results page for non-empty query', function() {
    var vm = $controller({ query: 'star wars'});
    vm.search();
    expect($location.url()).toBe('/results?q=star%20wars');
  });

  it('should not redirect to query results for empty query', function() {
    var vm = $controller({ query: ''});
    vm.search();
    expect($location.url()).toBe('');
  });
});
