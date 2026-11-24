'use strict';
// Minimal AngularJS stand-in: loads the app's source files in a VM context and
// captures what they register, so services and controllers can be unit tested
// under plain Node without a browser.
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var SRC = path.join(__dirname, '..', 'www', 'js');

function load(files) {
  var registry = {};
  var mod = {};
  ['factory', 'controller', 'directive', 'run', 'config'].forEach(function (kind) {
    mod[kind] = function (name, def) {
      if (typeof name === 'string') registry[name] = def;
      return mod;
    };
  });
  var context = vm.createContext({
    _: require('lodash'),
    angular: {
      module: function () { return mod; },
      lowercase: function (s) { return typeof s === 'string' ? s.toLowerCase() : s; }
    },
    console: console
  });
  files.forEach(function (f) {
    var file = path.join(SRC, f);
    vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  });
  return {
    context: context,
    // Invoke a registered ["dep", ..., fn] definition with named locals.
    invoke: function (name, locals) {
      var def = registry[name];
      var deps = def.slice(0, -1);
      return def[def.length - 1].apply(null, deps.map(function (d) {
        if (!(d in locals)) throw new Error('missing dependency ' + d + ' for ' + name);
        return locals[d];
      }));
    }
  };
}

// A thenable whose resolution the test controls.
function deferred() {
  var cbs = [];
  return {
    promise: { then: function (cb) { cbs.push(cb); } },
    resolve: function (value) { cbs.forEach(function (cb) { cb(value); }); }
  };
}

function fakeModels() {
  var words = deferred();
  var top = {};
  var topDefs = {};
  [50, 100, 200, 300, 400, 500].forEach(function (n) {
    topDefs[n] = deferred();
    top[n] = topDefs[n].promise;
  });
  return {
    models: { words: words.promise, top: top },
    resolveWords: function (db) { words.resolve({ data: db }); },
    resolveTop: function (n, list) { topDefs[n].resolve({ data: list }); }
  };
}

module.exports = { load: load, fakeModels: fakeModels };
