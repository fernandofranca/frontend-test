const test = require('tape');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

test('Ao adicionar 2 e remover 1 filme dos favoritos', function (assert) {
  assert.plan(3);
  
  nightmare
    .goto('http://localhost:3000')
    .type('header.navbar input', 'Quentin Tarantino')
    .select('header.navbar select', 'director')
    .click('header.navbar button')
    .wait('.director-info .content .movie-item')
    .click('.director-info .content .movie-item:nth-child(1) button.btn-add-fav')
    .click('.director-info .content .movie-item:nth-child(2) button.btn-add-fav')
    .click('.director-info .content .movie-item:nth-child(1) button.btn-remove-fav')
    .evaluate(function(){
      var data = {};
      var arrEl = document.querySelectorAll('.favoritos-view .movie-item');
      data.numFavorites = arrEl.length;
      return data;
    })
    .end()
    .then(function(data){
      assert.ok(data, 'Deve carregar o componente esperado.');
      assert.ok(data.numFavorites, 'Deve printar componentes de listagem de filmes.');
      assert.equal(data.numFavorites, 1, 'Deve conter 1 componente de listagem de filmes.');
    });
});