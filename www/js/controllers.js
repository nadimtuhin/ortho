angular.module('ortho.controllers', [])

.controller('DashCtrl', ["$scope", "Words", "$timeout", "$state", function($scope, Words, $timeout, $state) {
    $scope.search = function(word){
        $scope.notFound = false;

        $scope.word = Words.getByName(word);
        if (!$scope.word) {
            // $scope.notFound = true;

            // $timeout(function(){
            //     $scope.notFound = false;
            // }, 2000);

            return;
        }

        $state.go('tab.search', {wordId: $scope.word.id});

        //BUGFIX: dont know why $scope.notFound is true in ffos
        //in chrome it works fine
        $timeout(function(){$scope.notFound = false; }, 2000);};

}])

.controller('WordsCtrl',
    ["$scope", "$log", "Words",  "$stateParams", "$state", function($scope, $log, Words, $stateParams, $state) {
        $scope.page =  $stateParams.page;
        $scope.perPage = 20;

        $scope.paginate = function(page){
            $state.go('tab.words', {page: $scope.page });
        };

        $scope.prev = function(){
            $scope.page = --$scope.page === 0 ? --$scope.page : $scope.page;
            $scope.paginate();
        };

        $scope.next = function(){
            $scope.page = ++$scope.page === 0 ? ++$scope.page : $scope.page;
            $scope.paginate();
        };

        $scope.words = Words.paginate($scope.page, $scope.perPage);
        $log.info("we are in " + $scope.page);
}])

.controller('WordDetailCtrl',
    ["$scope", "$stateParams", "Words", function($scope, $stateParams, Words) {
        $scope.word = Words.get($stateParams.wordId);
}])

.controller('AccountCtrl', function($scope) {

});