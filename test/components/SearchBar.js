const test = require('tape');

const Vue = require('vue');
const SearchBar = require('../../src/js/components/SearchBar.js');

function mountVM(Component, propsData) {
  const Comp = Vue.extend(Component);
  return new Comp({ propsData: propsData }).$mount();
}

test('SearchBar component:', function (assert) {
  assert.plan(3);

  const vm = mountVM(SearchBar, {
    onSearch:function(type, text) {
      assert.equal(type, 'diretor', 'Should call function with the expected "type" parameter.');
      assert.equal(text, 'texto', 'Should call function with the expected "text" parameter.');
    }
  });

  assert.equal(typeof vm.$options.methods.search, 'function', 'Should have a search method.');
  
  vm.type="diretor";
  vm.text="texto";
  vm.$options.methods.search.apply(vm);

  assert.end();
});