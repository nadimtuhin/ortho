angular.module('ortho')
.controller('AlphabetsCtrl', ["$scope", "$state",
    function($scope, $state){
        $scope.alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
}]);