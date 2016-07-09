describe('Search Controller', function() {
  var $controller;
  var $location;
  var $timeout;

  beforeEach(module('movieApp'));

  beforeEach(inject(function(_$controller_, _$location_, _$timeout_) {
    $location = _$location_;
    $timeout = _$timeout_;
    $controller = _$controller_.bind(null, 'SearchController', { $location: $location, $timeout: $timeout });
  }));

  afterEach(function() {
    $timeout.verifyNoPendingTasks();
  });

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

  it('should redirect after 1 second of keyboard inactivity', function() {
    var vm = $controller({ query: 'star wars' });
    vm.keyup();
    $timeout.flush();
    expect($location.url()).toBe('/results?q=star%20wars');
  });

  it('should cancel timeout in keydown', function() {
    var vm = $controller({ query: 'star wars' });
    vm.keyup();
    vm.keydown();

    expect($timeout.verifyNoPendingTasks).not.toThrow();
  });

  it('should cancel timeout in search', function() {
    var vm = $controller({ query: 'star wars' });
    vm.keyup();
    vm.search();

    expect($timeout.verifyNoPendingTasks).not.toThrow();
  });
});
