/* jshint node: true */
'use strict';
var test = require('node:test');
var assert = require('node:assert');
var harness = require('./harness');

var DB = harness.DB;
var names = harness.names;

function loadedWords(app) {
  var fake = harness.fakeModels();
  var Words = app.invoke('Words', { $$models: fake.models });
  fake.resolveWords(DB);
  return Words;
}

function meaningCtrl(wordId) {
  var app = harness.load([
    'services/Words.js', 'controllers/WordMeaningCtrl.js'
  ]);
  var scope = {};
  app.invoke('WordMeaningCtrl', {
    $scope: scope,
    $stateParams: { wordId: wordId },
    Words: loadedWords(app),
    $timeout: function () {},
    $ionicNavBarDelegate: { showBackButton: function () {} }
  });
  return scope;
}

test('WordMeaningCtrl de-duplicates mnemonics of a known word', function () {
  var scope = meaningCtrl('0');
  assert.strictEqual(scope.word.name, 'abase');
  assert.deepStrictEqual(scope.word.mn, ['m1', 'm2']);
});

test('WordMeaningCtrl does not crash on an unknown word id', function () {
  // e.g. a stale bookmark #/tab/meaning/99999 or #/tab/meaning/abc
  var scope;
  assert.doesNotThrow(function () { scope = meaningCtrl('99999'); });
  assert.strictEqual(scope.word, undefined);
  assert.doesNotThrow(function () { meaningCtrl('abc'); });
});

function dashCtrl() {
  var app = harness.load(['services/Words.js', 'controllers/DashCtrl.js']);
  var scope = {};
  app.invoke('DashCtrl', {
    $scope: scope,
    Words: loadedWords(app),
    $timeout: function () {},
    $state: { go: function () {} }
  });
  return scope;
}

test('DashCtrl search is case-insensitive', function () {
  // Mobile keyboards capitalise the first letter;
  // dictionary keys are lower case.
  var scope = dashCtrl();
  scope.search('Aba');
  assert.deepStrictEqual(names(scope.suggestions), ['abase', 'abate']);
  scope.search('BAB');
  assert.deepStrictEqual(names(scope.suggestions), ['babble']);
});

test('DashCtrl search lists prefix matches before inner matches', function () {
  var scope = dashCtrl();
  scope.search('ab');
  assert.deepStrictEqual(names(scope.suggestions),
    ['abase', 'abate', 'babble']);
});
