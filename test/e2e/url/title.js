const test = require('tape');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

test('Ao acessar a URL de um filme existente', function (assert) {
  assert.plan(9);
  
  nightmare
    .goto('http://localhost:3000/#/movie/The Wolf of Wall Street')
    .wait('.movie-info .content .movie-item')
    .evaluate(function(){
      var data = {};
      var el = document.querySelector('.movie-info .content .movie-item');
      data.href = document.location.href;
      data.title = el.querySelector('.title').textContent;
      data.director = el.querySelector('.director').textContent;
      data.summary = el.querySelector('.summary').textContent;
      data.cast = el.querySelector('.cast').textContent;
      return data;
    })
    .end()
    .then(function(data){
      assert.ok(data, 'Carregou o componente esperado.');
      assert.equal(data.href, 'http://localhost:3000/#/movie/The Wolf of Wall Street', 'Deve estar na url esperada.');
      assert.ok(data.title.trim().length>0, 'Deve ter algum texto no elemento "title"');
      assert.ok(data.title.trim().indexOf('The Wolf of Wall Street')>-1, 'Deve conter o texto esperado');
      assert.ok(data.director.trim().length>0, 'Deve ter algum texto no elemento "director"');
      assert.ok(data.director.trim().indexOf('Martin Scorsese')>-1, 'Deve conter o texto esperado');
      assert.ok(data.summary.trim().length>0, 'Deve ter algum texto no elemento "summary"');
      assert.ok(data.cast.trim().length>0, 'Deve ter algum texto no elemento "cast"');
      assert.ok(data.cast.trim().indexOf('Leonardo DiCaprio')>-1, 'Deve conter o texto esperado');
    });
});