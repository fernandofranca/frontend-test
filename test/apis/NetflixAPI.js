const test = require('tape');

const NetflixAPI = require('../../src/js/apis/NetflixAPI.js');
 
test('NetflixAPI functions:', function (assert) {
  assert.equal(typeof NetflixAPI.searchTitle, 'function', 'Should have a searchTitle function');
  assert.equal(typeof NetflixAPI.searchDirector, 'function', 'Should have a searchDirector function');
  assert.equal(typeof NetflixAPI.searchActor, 'function', 'Should have a searchActor function');

  assert.end();
});

test('NetflixAPI.searchTitle returned object:', function (assert) {
  assert.plan(9);

  NetflixAPI.searchTitle('Forrest Gump')
  .then((data) => {
    assert.equal(typeof data, 'object', 'Should be an object');
    assert.ok(data.category, 'Should have "category" property');
    assert.ok(data.director, 'Should have "director" property');
    assert.ok(data.poster, 'Should have "poster" property');
    assert.ok(data.release_year, 'Should have "release_year" property');
    assert.ok(data.runtime, 'Should have "runtime" property');
    assert.ok(data.show_cast, 'Should have "show_cast" property');
    assert.ok(data.show_title, 'Should have "show_title" property');
    assert.ok(data.summary, 'Should have "summary" property');
  });
});

test('NetflixAPI.searchDirector returned object:', function (assert) {
  assert.plan(12);

  NetflixAPI.searchDirector('Steven Spielberg')
  .then((data) => {
    assert.equal(data.constructor.name, 'Array', 'Should be an array.');
    assert.ok(data.length>0, 'Array should at least an element.');
    assert.ok(data[0].category, 'Elements should have "category" property.');
    assert.ok(data[0].director, 'Elements should have "director" property.');
    assert.ok(data[0].poster, 'Elements should have "poster" property.');
    assert.ok(data[0].rating, 'Elements should have "rating" property.');
    assert.ok(data[0].release_year, 'Elements should have "release_year" property.');
    assert.ok(data[0].runtime, 'Elements should have "runtime" property.');
    assert.ok(data[0].show_cast, 'Elements should have "show_cast" property.');
    assert.ok(data[0].show_id, 'Elements should have "show_id" property.');
    assert.ok(data[0].show_title, 'Elements should have "show_title" property.');
    assert.ok(data[0].summary, 'Elements should have "summary" property.');
  });
});

test('NetflixAPI.searchActor returned object:', function (assert) {
  assert.plan(11);

  NetflixAPI.searchActor('Tom Hanks')
  .then((data) => {
    assert.equal(data.constructor.name, 'Array', 'Should be an array.');
    assert.ok(data.length>0, 'Array should at least an element.');
    assert.ok(data[0].category, 'Elements should have "category" property.');
    assert.ok(data[0].director, 'Elements should have "director" property.');
    assert.ok(data[0].poster, 'Elements should have "poster" property.');
    assert.ok(data[0].rating, 'Elements should have "rating" property.');
    assert.ok(data[0].release_year, 'Elements should have "release_year" property.');
    assert.ok(data[0].runtime, 'Elements should have "runtime" property.');
    assert.ok(data[0].show_cast, 'Elements should have "show_cast" property.');
    assert.ok(data[0].show_title, 'Elements should have "show_title" property.');
    assert.ok(data[0].summary, 'Elements should have "summary" property.');
  });
});
