angular.module('ortho')
.factory('$$models', ["$http", function($http) {
  var db = $http.get('js/data/db.json'),
      top50 = $http.get('js/data/top50.json');

      // top100 = $http.get('js/data/top100.json'),
      // top200 = $http.get('js/data/top200.json'),
      // top300 = $http.get('js/data/top300.json'),
      // top400 = $http.get('js/data/top400.json'),
      // top500 = $http.get('js/data/top500.json'),
      // top600 = $http.get('js/data/top600.json'),
      // top700 = $http.get('js/data/top700.json'),
      // top800 = $http.get('js/data/top800.json'),
      // top900 = $http.get('js/data/top900.json'),
      // top1000 = $http.get('js/data/top1000.json')


  return {
    db: db,
    top50: top50
  };
}]);