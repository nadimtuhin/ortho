// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ortho' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ortho.services' is found in services.js
// 'ortho.controllers' is found in controllers.js
angular.module('ortho', ['ionic', 'ortho.controllers', 'ortho.services'])

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
}])

.config(["$stateProvider", "$urlRouterProvider", "$compileProvider", function($stateProvider, $urlRouterProvider, $compileProvider) {

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })
    .state('tab.search', {
      url: '/search/:wordId',
      views: {
        'tab-dash': {
          templateUrl: 'templates/word-detail.html',
          controller: 'WordDetailCtrl'
        }
      }
    })

    .state('tab.words', {
      url: '/words/:page',
      views: {
        'tab-words': {
          templateUrl: 'templates/tab-words.html',
          controller: 'WordsCtrl'
        }
      }
    })
    .state('tab.word-detail', {
      url: '/word/:wordId',
      views: {
        'tab-words': {
          templateUrl: 'templates/word-detail.html',
          controller: 'WordDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

}]);

function getSrv(name) {
  return angular.element(document.body).injector().get(name);
}