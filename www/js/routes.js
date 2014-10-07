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
				'tab-alphabets': {
					templateUrl: 'templates/alphabet/words.html',
					controller: 'AlphabetWordsCtrl'
				}
			}
		})

		.state('tab.alphabet-word', {
			url: '/meaning/:wordId',
			views: {
				'tab-alphabets': {
					templateUrl: 'templates/word/meaning.html',
					controller: 'WordMeaningCtrl'
				}
			}
		})





		.state('tab.setting', {
			url: '/setting',
			views: {
				'tab-setting': {
					templateUrl: 'templates/tab-settings.html',
					controller: 'SettingsCtrl'
				}
			}
		});


}]);