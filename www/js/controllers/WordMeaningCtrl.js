angular.module('ortho')
.controller('WordMeaningCtrl', ["$scope", "$stateParams", "Words", "$timeout", "$ionicNavBarDelegate",
    function($scope, $stateParams, Words, $timeout, $ionicNavBarDelegate) {
		$timeout( function() {
			$ionicNavBarDelegate.showBackButton(false);
		}, 0);

        $scope.word = Words.get($stateParams.wordId);
        $scope.word.mn = _.uniq($scope.word.mn);
}]);