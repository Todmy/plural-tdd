describe('Home Controller', function() {
  var controller;
  var $interval;
  var $rootScope;

  var results = [
    {
      "Title":"Star Wars: Episode IV - A New Hope",
      "imdbID":"tt0076759"
    },
    {
      "Title":"Star Wars: Episode V - The Empire Strikes Back",
      "imdbID":"tt0080684"
    },
    {
      "Title":"Star Wars: Episode VI - Return of the Jedi",
      "imdbID":"tt0086190"
    }
  ];

  beforeEach(module('movieApp', 'movieCore', 'omdb'));

  beforeEach(inject(function(_$controller_, _$interval_, _$q_, _PopularMovies_, _omdbApi_, _$rootScope_) {
    $interval = _$interval_;
    controller = _$controller_.bind(null, 'HomeController', { $interval: $interval, PopularMovies: _PopularMovies_, omdbApi: _omdbApi_ });
    $rootScope = _$rootScope_;

    spyOn(_PopularMovies_, 'get').and.callFake(function() {
      var deferred = _$q_.defer();
      deferred.resolve(results.map(function(elem) {
        return elem.imdbID;
      }));

      return deferred.promise;
    });

    spyOn(_omdbApi_, 'find').and.callFake(function() {
      var deferred = _$q_.defer();
      var args = _omdbApi_.find.calls.mostRecent().args[0];

      deferred.resolve(results.filter(function(elem) {
        return elem.imdbID === args;
      })[0]);

      return deferred.promise;
    });
  }));

  it('should rotate moview every 5 seconds', function() {
    var vm = controller();
    $rootScope.$apply();

    expect(vm.result.Title).toBe(results[0].Title);
    $interval.flush(5000);
    expect(vm.result.Title).toBe(results[1].Title);
    $interval.flush(5000);
    expect(vm.result.Title).toBe(results[2].Title);
    $interval.flush(5000);
    expect(vm.result.Title).toBe(results[0].Title);
  });
});
