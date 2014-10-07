angular.module('ortho')
.factory('Words', function() {

  // Might use a resource here that returns a JSON array
  var id=0, words = _.chain(window.words).map(function(meaning, word){
    return meaning.name = word, meaning.id=id++, meaning;
  }).toArray().value();

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
  };
});