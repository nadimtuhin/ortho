angular.module('ortho')
.factory('Words', ["$$models",  function($$models) {
  var  id=0, words;

  $$models.db.then(function(res){
    //TODO: here we are doing extra work
    //map the json perfectly so we dont need to do this again
    words = _.chain(res.data[0]).map(function(meaning, word){
      return meaning.name = word, meaning.id=id++, meaning;
    }).toArray().value();
  });

  return {
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
    }
  };
}]);