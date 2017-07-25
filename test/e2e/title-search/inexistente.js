const test = require('tape');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

test('Ao buscar um filme inexistente', function (assert) {
  assert.plan(3);
  
  nightmare
    .goto('http://localhost:3000')
    .type('header.navbar input', 'TXDRVR')
    .select('header.navbar select', 'title')
    .click('header.navbar button')
    .wait('.no-resuls')
    .evaluate(function(){
      var data = {};
      var el = document.querySelector('.no-resuls');
      data.href = document.location.href;
      data.message = el.querySelector('.content').textContent.trim();
      return data;
    })
    .end()
    .then(function(data){
      assert.ok(data, 'Carregou o componente esperado.');
      assert.equal(data.href, 'http://localhost:3000/#/no-results', 'Deve estar na url esperada.');
      assert.equal(data.message, 'Nenhum resultado foi encontrado.', 'Deve printar a mensagem de status.');
    });
});