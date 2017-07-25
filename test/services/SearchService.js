const test = require('tape');

const Vue = require('vue');
const SearchBar = require('../../src/js/services/SearchService.js');
const eventHub = require('../../src/js/eventHub.js');

function mountVM(Component, propsData) {
  const Comp = Vue.extend(Component);
  return new Comp({ propsData: propsData }).$mount();
}

test('SearchService um item existente:', function (assert) {
  assert.plan(6);

  const vm = mountVM(SearchBar, {});

  eventHub.$once("search-started", function () {
    assert.pass('Emitiu o evento "search-started".');
  });

  eventHub.$once("search-ended", function () {
    assert.pass('Emitiu o evento "search-ended".');
  });

  eventHub.$once("search-result", function (paylod) {
    assert.pass('Emitiu o evento "search-result".');
    assert.equal(typeof paylod, 'object', 'Deve receber um objeto.');
    assert.ok(paylod.type, 'A payload deve ter uma propriedade "type".');
    assert.ok(paylod.result, 'A payload deve ter uma propriedade "result".');
  });

  // Inicia emitindo o evento
  eventHub.$emit("search-start", {type:'title', text:'Raging Bull'});
});

test('SearchService para um item inexistente:', function (assert) {
  assert.plan(5);

  const vm = mountVM(SearchBar, {});

  eventHub.$once("search-started", function () {
    assert.pass('Emitiu o evento "search-started".');
  });

  eventHub.$once("search-ended", function () {
    assert.pass('Emitiu o evento "search-ended".');
  });

  eventHub.$once("search-result-not-found", function (paylod) {
    assert.pass('Emitiu o evento "search-result-not-found".');
    assert.equal(typeof paylod, 'object', 'Deve receber um objeto.');
    assert.ok(paylod.erro, 'A payload deve ter uma propriedade "erro".');
  });

  // Inicia emitindo o evento
  eventHub.$emit("search-start", {type:'director', text:'Raging Bull'});
});