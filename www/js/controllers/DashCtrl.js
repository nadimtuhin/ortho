angular.module('ortho')
.controller('DashCtrl', ["$scope", "Words", "$timeout", "$state",
    function($scope, Words, $timeout, $state) {
	$scope.suggestions = [];

	$scope.go = function(word){
        $scope.word = Words.getByName(word);
        if (!$scope.word)return;

        $state.go('tab.dash-meaning', {wordId: $scope.word.id});
	};
    
    $scope.search = function(search){
    	if(!search){
			$scope.suggestions = [];
			return;
    	}
        $scope.suggestions = getSuggestions(search).splice(0,20);
    };

    var getWordMatches = function(search){
    	return _.filter(Words.all(), function(word){
		   return -1!==word.name.indexOf(search);
		});
    };

    var getSuggestions = function(search){
    	var suggestions = getWordMatches(search);

    	var start = _.filter(suggestions, function(word){
    		return 0 === word.name.indexOf(search);
    	});

    	var middle = _.filter(suggestions, function(word){
    		return 0 !== word.name.indexOf(search);
    	});

    	return start.concat(middle);
    };
}]);