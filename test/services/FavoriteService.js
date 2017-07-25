const test = require('tape');
const fakeItem = {
  category:"Classic Movies",
  director:"Martin Scorsese",
  mediatype:0,
  poster:"http://netflixroulette.net/api/posters/18907685.jpg",
  rating:"3.8",
  release_year:"1976",
  runtime:"113 min",
  show_cast:"Robert De Niro, Jodie Foster, Cybill Shepherd, Albert Brooks, Harvey Keitel, Leonard Harris, Peter Boyle, Victor Argo",
  show_id:18907685,
  show_title:"Taxi Driver",
  summary:"After a cute political campaign worker spurns him, an unhinged New York City cabbie decides to assassinate her candidate. Meanwhile, he tries to protect a child prostitute from a smooth-talking pimp in this gripping tale of urban decay and insanity.",
  unit:582,
};

test('FavoriteService ao iniciar', (assert) => {
  const service = require('../../src/js/services/FavoriteService.js');
  service.clear();

  assert.equal(service.asArray().length, 0, 'Não deve conter nenhum elemento no array');
  assert.end();
});

test('FavoriteService ao adicionar', (assert) => {
  const service = require('../../src/js/services/FavoriteService.js');
  service.clear();
  service.add(fakeItem);

  assert.equal(service.asArray().length, 1, 'Deve conter um elemento no array');
  assert.ok(service.isFavorite(18907685), 'Deve retornar true para um elemento adicioando');
  assert.end();
});

test('FavoriteService ao adicionar duas vezes o mesmo elemento', (assert) => {
  const service = require('../../src/js/services/FavoriteService.js');
  service.clear();
  service.add(fakeItem);
  service.add(fakeItem);

  assert.equal(service.asArray().length, 1, 'Deve conter apenas um elemento no array');
  assert.ok(service.isFavorite(18907685), 'Deve retornar true para um elemento adicioando');
  assert.end();
});

test('FavoriteService ao remover', (assert) => {
  const service = require('../../src/js/services/FavoriteService.js');
  service.clear();
  service.add(fakeItem);

  service.remove(18907685);
  assert.ok(service.isFavorite(18907685)===false, 'Deve retornar false para um elemento removido');

  assert.end();
});