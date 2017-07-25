const test = require('tape');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

test('Ao adicionar filmes aos favoritos', function (assert) {
  assert.plan(3);
  
  nightmare
    .goto('http://localhost:3000')
    .type('header.navbar input', 'Quentin Tarantino')
    .select('header.navbar select', 'director')
    .click('header.navbar button')
    .wait('.director-info .content .movie-item')
    .click('.director-info .content .movie-item:nth-child(1) button.btn-add-fav')
    .click('.director-info .content .movie-item:nth-child(2) button.btn-add-fav')
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
      assert.equal(data.numFavorites, 2, 'Deve conter 2 componentes de listagem de filmes.');
    });
});