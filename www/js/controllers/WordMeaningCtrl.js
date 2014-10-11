angular.module('ortho')
.controller('WordMeaningCtrl', ["$scope", "$stateParams", "Words",
    function($scope, $stateParams, Words) {
        $scope.word = Words.get($stateParams.wordId);
        $scope.word.mn = _.uniq($scope.word.mn);
}]);