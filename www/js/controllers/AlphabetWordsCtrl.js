angular.module('ortho')
.controller('AlphabetWordsCtrl', ["$scope", "Words", "$stateParams", "$state", function($scope, Words, $stateParams, $state){
    $scope.alphabet = $stateParams.alphabet;
    $scope.page =  $stateParams.page;
    $scope.perPage = 10;

    $scope.thisAlphWords = Words.all().filter(function(word){
        return word.name.indexOf(angular.lowercase($scope.alphabet)) === 0;
    });


    $scope.paginate = function(page){
        $state.go('tab.alphabet-words', {alphabet: $scope.alphabet, page: $scope.page });
    };

    $scope.prev = function(){
        if( --$scope.page === 0 ) $scope.page--;
        $scope.paginate();
    };

    $scope.next = function(){
        if( ++$scope.page === 0 ) $scope.page++;
        $scope.paginate();
    };
    console.log('we are in page '+$scope.page);

    $scope.words = Words.paginate($scope.page, $scope.perPage, $scope.thisAlphWords);
}]);