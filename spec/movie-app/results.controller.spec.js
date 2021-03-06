describe('Results Controller', function() {
  var results = {
    'Search': [
      {
        "Title":"Star Wars: Episode IV - A New Hope",
        "Year":"1977",
        "imdbID":"tt0076759",
        "Type":"movie"
      },
      {
        "Title":"Star Wars: Episode V - The Empire Strikes Back",
        "Year":"1980",
        "imdbID":"tt0080684",
        "Type":"movie"
      },
      {
        "Title":"Star Wars: Episode VI - Return of the Jedi",
        "Year":"1983",
        "imdbID":"tt0086190",
        "Type":"movie"
      }
    ]
  };

  var $controller;
  var $q;
  var $rootScope;
  var omdbApi;
  var $location;
  var searchQuery = { q: 'star wars' };

  beforeEach(module('movieApp', 'omdb'));

  beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _omdbApi_, _$location_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    omdbApi = _omdbApi_;
    $location = _$location_;

    $controller = _$controller_.bind(null, 'ResultsController', { $location: $location });

    spyOn($location, 'search').and.callFake(function() {
      return searchQuery;
    })
  }));

  it('should load search results', function() {
    spyOn(omdbApi, 'search').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(results);

      return deferred.promise;
    });

    var vm = $controller();

    $rootScope.$apply();

    expect(vm.results[0].Title).toBe(results.Search[0].Title);
    expect(vm.results[1].Title).toBe(results.Search[1].Title);
    expect(vm.results[2].Title).toBe(results.Search[2].Title);
  });

  it('should return current query', function() {
    var vm = $controller();

    expect(vm.getQuery()).toBe(searchQuery.q);
  });

  it('should set result status to error', function() {
    var errorMessage = 'Something went wrong!';

    spyOn(omdbApi, 'search').and.callFake(function() {
      var deferred = $q.defer();
      deferred.reject(errorMessage);

      return deferred.promise;
    });

    var vm = $controller();

    $location.search('q', searchQuery);
    $rootScope.$apply();
    expect(vm.errorMessage).toBe(errorMessage);
  });
});
