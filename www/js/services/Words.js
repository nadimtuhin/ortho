angular.module('ortho')
.factory('Words', ["$$models",	function($$models) {
	var	id=0, topWords = {};
	var topSanitizer = function(data){
		return _.chain(data).map(function(word){
			return angular.lowercase(word);
		}).toArray().value();
	};

	_([50, 100, 200, 300, 400, 500]).each(function(nn){
		$$models.top[nn].then(function(res){
			topWords[nn] = topSanitizer(res.data);
		});
	});

	$$models.words.then(function(res){
		//TODO: here we are doing extra work
		//map the json perfectly so we dont need to do this again
		words = _.chain(res.data[0]).map(function(meaning, word){
			return meaning.name = word, meaning.id=id++, meaning;
		}).toArray().value();
	});

	return {
        topWords: topWords,
		all: function() {
			return words;
		},
		paginate: function(page, count, words) {
			var from = (page-1)*count,
					to = page*count;

			return words.slice(from, to);
		},
		getByName: function(word) {
			return _.findWhere(words, {name: angular.lowercase(word)});
		},
		get: function(id) {
			return _.findWhere(words, {id: parseInt(id)});
		},
		alphabetFilter: function(alphabet){
			return words.filter(function(word){
				return word.name.indexOf(angular.lowercase(alphabet)) === 0;
			});
		},
		top: function(top){
			return words.filter(function(word){
				return _.contains(topWords[top], word.name);
			});
		}
	};
}]);