angular.module('ortho')
.factory('$$models', ["$http", function($http) {
  var words, top = {};

  top['50'] = $http.get('js/data/top50.json');
  top['100'] = $http.get('js/data/top100.json');
  top['200'] = $http.get('js/data/top200.json');
  top['300'] = $http.get('js/data/top300.json');
  top['400'] = $http.get('js/data/top400.json');
  top['500'] = $http.get('js/data/top500.json');
  // top['600'] = $http.get('js/data/top600.json');
  // top['700'] = $http.get('js/data/top700.json');
  // top['800'] = $http.get('js/data/top800.json');
  // top['900'] = $http.get('js/data/top900.json');
  // top['1000'] = $http.get('js/data/top1000.json');

  words = $http.get('js/data/db.json');

  return {
    words: words,
    top: top
  };
}]);