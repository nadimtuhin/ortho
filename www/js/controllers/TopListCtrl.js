angular.module('ortho')
.controller('TopListCtrl', ["$scope", "Words", "$stateParams", "$state", "$log",
    function($scope, Words, $stateParams, $state, $log){
        var topWords;

        $scope.page     = $stateParams.page;
        $scope.top      = $stateParams.top;
        $scope.perPage  = 10;
        $scope.title 	= "Top "+$stateParams.top;

        topWords            = Words['top'+$scope.top]();
        $scope.totalPages   = Math.ceil(topWords.length / $scope.perPage);


        $log.info('we are in page ' + $scope.page);
        $log.info('total words ' + topWords.length);
        $log.info('total pages ' + $scope.totalPages);
        $log.info(topWords);


        $scope.paginate = function(page){
            $state.go('tab.top', {top: $scope.top, page: $scope.page });
        };

        $scope.prev = function(){
            if( $scope.page-- <= 1 ) $scope.page = $scope.totalPages;
            $scope.paginate();
        };

        $scope.next = function(){
            if( $scope.page++ >=  $scope.totalPages) $scope.page = 1;
            $scope.paginate();
        };

        $scope.words = Words.paginate($scope.page, $scope.perPage, topWords);
}]);