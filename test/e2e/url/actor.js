const test = require('tape');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

test('Ao acessar a URL de um filme existente', function (assert) {
  assert.plan(8);
  
  nightmare
    .goto('http://localhost:3000/#/actor/Matthew McConaughey')
    .wait('.actor-info .content .movie-item')
    .evaluate(function(){
      var data = {};
      var el = document.querySelector('.actor-info .content .movie-item');
      data.href = document.location.href;
      data.title = el.querySelector('.title').textContent;
      data.director = el.querySelector('.director').textContent;
      data.director = el.querySelector('.director').textContent;
      data.summary = el.querySelector('.summary').textContent;
      data.cast = el.querySelector('.cast').textContent;
      return data;
    })
    .end()
    .then(function(data){
      assert.ok(data, 'Carregou o componente esperado.');
      assert.equal(data.href, 'http://localhost:3000/#/actor/Matthew McConaughey', 'Deve estar na url esperada.');
      assert.ok(data.href.trim().length>0, 'Deve ter algum texto no elemento "href"');
      assert.ok(data.title.trim().length>0, 'Deve ter algum texto no elemento "title"');
      assert.ok(data.director.trim().length>0, 'Deve ter algum texto no elemento "director"');
      assert.ok(data.director.trim().length>0, 'Deve ter algum texto no elemento "director"');
      assert.ok(data.summary.trim().length>0, 'Deve ter algum texto no elemento "summary"');
      assert.ok(data.cast.trim().length>0, 'Deve ter algum texto no elemento "cast"');
    });
});