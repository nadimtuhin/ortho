/* jshint node: true */
'use strict';
var test = require('node:test');
var assert = require('node:assert');
var harness = require('./harness');

var DB = harness.DB;
var names = harness.names;

function setup() {
  var app = harness.load(['services/Words.js']);
  var fake = harness.fakeModels();
  var Words = app.invoke('Words', { $$models: fake.models });
  return { app: app, fake: fake, Words: Words };
}

test('alphabetFilter and top do not throw before the dictionary loads',
function () {
  // Opening a deep link such as #/tab/alphabet/A/1 runs the controller
  // before db.json has arrived.
  var s = setup();
  // (arrays come from the VM realm, so compare lengths rather than deep-equal)
  assert.strictEqual(s.Words.alphabetFilter('A').length, 0);
  assert.strictEqual(s.Words.top(50).length, 0);
  assert.strictEqual(s.Words.all().length, 0);
});

test('the word list is not leaked as an implicit global', function () {
  var s = setup();
  s.fake.resolveWords(DB);
  assert.strictEqual(s.app.context.words, undefined);
  assert.strictEqual(s.Words.all().length, 3);
});

test('lookups work once the dictionary has loaded', function () {
  var s = setup();
  s.fake.resolveWords(DB);
  s.fake.resolveTop(50, ['Abate']);
  assert.deepStrictEqual(names(s.Words.alphabetFilter('A')),
    ['abase', 'abate']);
  assert.deepStrictEqual(names(s.Words.top(50)), ['abate']);
  assert.strictEqual(s.Words.getByName('Babble').sd, 'talk');
  assert.strictEqual(s.Words.get('0').name, 'abase');
});
