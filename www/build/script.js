function getSrv(name) {
  return angular.element(document.body).injector().get(name);
}
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ortho' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ortho.services' is found in services.js
// 'ortho.controllers' is found in controllers.js
angular.module('ortho', ['ionic'])

.run(["$ionicPlatform", function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}]);
angular.module('ortho')
.factory('$$models', ["$http", function($http) {
  var db = $http.get('js/data/db.json'),
      top50 = $http.get('js/data/top50.json'),
      top100 = $http.get('js/data/top100.json'),
      top200 = $http.get('js/data/top200.json'),
      top300 = $http.get('js/data/top300.json'),
      top400 = $http.get('js/data/top400.json'),
      top500 = $http.get('js/data/top500.json'),
      top600 = $http.get('js/data/top600.json'),
      top700 = $http.get('js/data/top700.json'),
      top800 = $http.get('js/data/top800.json'),
      top900 = $http.get('js/data/top900.json'),
      top1000 = $http.get('js/data/top1000.json');


  return {
    db: db
  };
}]);
angular.module('ortho')
.factory('Words', ["$$models",  function($$models) {
  var  id=0, words;

  $$models.db.then(function(res){
    //TODO: here we are doing extra work
    //map the json perfectly so we dont need to do this again
    words = _.chain(res.data[0]).map(function(meaning, word){
      return meaning.name = word, meaning.id=id++, meaning;
    }).toArray().value();
  });

  return {
    all: function() {
      return words;
    },
    paginate: function(page, count, words) {
      var from = (page-1)*count,
          to = page*count;

      return words.slice(from, to);
    },
    getByName: function(word) {
      return _.findWhere(words, {name: angular.lowercase(word)});
    },
    get: function(id) {
      return _.findWhere(words, {id: parseInt(id)});
    },
    alphabetFilter: function(alphabet){
      return words.filter(function(word){
        return word.name.indexOf(angular.lowercase(alphabet)) === 0;
      });
    }
  };
}]);
angular.module('ortho')
.controller('AlphabetWordsCtrl', ["$scope", "Words", "$stateParams", "$state", "$log",
    function($scope, Words, $stateParams, $state, $log){
        var alphabetWords;

        $scope.page     = $stateParams.page;
        $scope.alphabet = $stateParams.alphabet;
        $scope.perPage  = 10;

        alphabetWords       = Words.alphabetFilter($scope.alphabet);
        $scope.totalPages   = Math.ceil(alphabetWords.length / $scope.perPage);


        // $log.info('we are in page ' + $scope.page);
        // $log.info('total words ' + alphabetWords.length);
        // $log.info('total pages ' + $scope.totalPages);


        $scope.paginate = function(page){
            $state.go('tab.alphabet-words', {alphabet: $scope.alphabet, page: $scope.page });
        };

        $scope.prev = function(){
            if( $scope.page-- <= 1 ) $scope.page = $scope.totalPages;
            $scope.paginate();
        };

        $scope.next = function(){
            if( $scope.page++ >=  $scope.totalPages) $scope.page = 1;
            $scope.paginate();
        };


        $scope.words = Words.paginate($scope.page, $scope.perPage, alphabetWords);
}]);
angular.module('ortho')
.controller('AlphabetsCtrl', ["$scope", "$state",
    function($scope, $state){
        $scope.alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
}]);
angular.module('ortho')
.controller('DashCtrl', ["$scope", "Words", "$timeout", "$state",
    function($scope, Words, $timeout, $state) {
    $scope.search = function(word){
        $scope.word = Words.getByName(word);
        if (!$scope.word) {
            alert('word does not exist in the dictionary');
            return;
        }

        $state.go('tab.dash-meaning', {wordId: $scope.word.id});
    };
}]);
angular.module('ortho')
.controller('SettingsCtrl', ["$scope",
    function($scope) {

}]);
angular.module('ortho')
.controller('WordMeaningCtrl', ["$scope", "$stateParams", "Words",
    function($scope, $stateParams, Words) {
        $scope.word = Words.get($stateParams.wordId);
}]);
angular.module('ortho')
.config(["$stateProvider", "$urlRouterProvider", "$compileProvider",
	function($stateProvider, $urlRouterProvider, $compileProvider) {

		//fixes issues with ffos
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/tab/dash');

		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		$stateProvider
		// setup an abstract state for the tabs directive
		.state('tab', {
			url: "/tab",
			abstract: true,
			templateUrl: "templates/tabs.html"
		})




		// Each tab has its own nav history stack:
		.state('tab.dash', {
			url: '/dash',
			views: {
				'tab-dash': {
					templateUrl: 'templates/dash/dash.html',
					controller: 'DashCtrl'
				}
			}
		})
		.state('tab.dash-meaning', {
			url: '/dash/meaning/:wordId',
			views: {
				'tab-dash': {
					templateUrl: 'templates/word/meaning.html',
					controller: 'WordMeaningCtrl'
				}
			}
		})




		// Each tab has its own nav history stack:
		.state('tab.alphabets', {
			url: '/alphabets',
			views: {
				'tab-alphabets': {
					templateUrl: 'templates/alphabet/alphabets.html',
					controller: 'AlphabetsCtrl'
				}
			}
		})

		.state('tab.alphabet-words', {
			url: '/alphabet/:alphabet/:page',
			views: {
				'tab-words': {
					templateUrl: 'templates/alphabet/words.html',
					controller: 'AlphabetWordsCtrl'
				}
			}
		})

		.state('tab.alphabet-word', {
			url: '/meaning/:wordId',
			views: {
				'tab-words': {
					templateUrl: 'templates/word/meaning.html',
					controller: 'WordMeaningCtrl'
				}
			}
		})


		.state('tab.setting', {
			url: '/setting',
			views: {
				'tab-settings': {
					templateUrl: 'templates/tab-settings.html',
					controller: 'SettingsCtrl'
				}
			}
		});


}]);