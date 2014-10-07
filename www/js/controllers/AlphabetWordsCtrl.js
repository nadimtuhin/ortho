angular.module('ortho')
.controller('AlphabetWordsCtrl', ["$scope", "Words", "$stateParams", "$state", "$log",
    function($scope, Words, $stateParams, $state, $log){
        var alphabetWords;

        $scope.page     = $stateParams.page;
        $scope.alphabet = $stateParams.alphabet;
        $scope.perPage  = 10;

        alphabetWords       = Words.alphabetFilter($scope.alphabet);
        $scope.totalPages   = Math.ceil(alphabetWords.length / $scope.perPage);


        $log.info('we are in page ' + $scope.page);
        $log.info('total words ' + alphabetWords.length);
        $log.info('total pages ' + $scope.totalPages);



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