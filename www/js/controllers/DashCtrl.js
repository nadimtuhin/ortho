angular.module('ortho')
.controller('DashCtrl', ["$scope", "Words", "$timeout", "$state",
    function($scope, Words, $timeout, $state) {
    $scope.search = function(word){
        $scope.word = Words.getByName(word);
        if (!$scope.word) {
            alert('word "'+ word +'" does not exist in the dictionary');
            return;
        }

        $state.go('tab.dash-meaning', {wordId: $scope.word.id});
    };
}]);