const Vue = require('vue');

const eventHub = require('../eventHub.js');
const NetflixAPI = require('../apis/NetflixAPI.js');

/*
Escuta os eventos:
search-start

Emite os eventos:
search-started
search-ended
search-result
search-result-not-found
*/

const searchMethods = {
  "title": NetflixAPI.searchTitle,
  "director": NetflixAPI.searchDirector,
  "actor": NetflixAPI.searchActor,
}

module.exports = new Vue({
  created:function () {
    this.listen();
  },
  methods:{
    listen: function () {
      var _this = this;
      eventHub.$on("search-start", this.search);
    },
    /**
     * Busca na API do NetFlix usando algum dos métodos 
     * conhecidos (title, actor, director)
     * 
     * @param  {Object} payload {type, text}
     * @return 
     */
    search: function (payload) {
      eventHub.$emit("search-started");
      
      const method = searchMethods[payload.type];

      if (method){
        method(payload.text)
        .then((result) => {
          eventHub.$emit("search-ended");
          eventHub.$emit("search-result", {query:payload.text, type: payload.type, result});
        })
        .catch((err) => {
          var details = {};

          if (err.response.status===404){
            details = {erro:"Não há resultados para esta consulta."};
          } else {
            details = {erro:"Não foi possível fazer esta consulta."};
          }

          eventHub.$emit("search-ended");
          eventHub.$emit("search-result-not-found", details);
        });
      }
    }
  }
});