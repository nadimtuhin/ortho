/* jshint node: true */
'use strict';
var test = require('node:test');
var assert = require('node:assert');
var fs = require('fs');
var os = require('os');
var path = require('path');
var cp = require('child_process');

var HOOK = path.join(__dirname, '..', 'hooks', 'after_prepare',
  '010_add_platform_class.js');

function run(root) {
  return cp.spawnSync(process.execPath, [HOOK, root], {
    cwd: root,
    env: Object.assign({}, process.env, { CORDOVA_PLATFORMS: 'android' }),
    encoding: 'utf8'
  });
}

test('after_prepare hook adds platform classes to the body tag', function () {
  var root = fs.mkdtempSync(path.join(os.tmpdir(), 'ortho-hook-'));
  var dir = path.join(root, 'platforms', 'android', 'assets', 'www');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'),
    '<html><body ng-app="ortho"></body></html>');
  var res = run(root);
  assert.strictEqual(res.status, 0, res.stderr);
  assert.match(fs.readFileSync(path.join(dir, 'index.html'), 'utf8'),
    new RegExp('<body ng-app="ortho" class="platform-android ' +
      'platform-cordova platform-webview">'));
});

test('after_prepare hook reports an unreadable index.html, not a crash',
function () {
  var root = fs.mkdtempSync(path.join(os.tmpdir(), 'ortho-hook-'));
  // index.html exists but cannot be read as a file (EISDIR)
  var index = path.join(root, 'platforms', 'android', 'assets', 'www',
    'index.html');
  fs.mkdirSync(index, { recursive: true });
  var res = run(root);
  assert.strictEqual(res.status, 0, res.stderr);
  assert.doesNotMatch(res.stderr, /TypeError/);
  assert.match(res.stdout, /EISDIR/);
});
