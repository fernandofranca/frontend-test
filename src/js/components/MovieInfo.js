const Vue = require('vue');
const Modal = require('./ui/Modal.js');
const Icon = require('./ui/Icon.js');
const Poster = require('./Poster.js');

const eventHub = require('../eventHub.js');

module.exports = Vue.component('MovieInfo', {
  props: ['name'],
  data: function () {
    return {
      result: null
    };
  },
  watch:{
    /* Caso já esteja montado e a prop muda */
    name: function (val) {
      this.getMovieInfo();
    // TODO
    }
  },
  mounted: function () {
    this.getMovieInfo(this.name); /* Faz outra busca caso o param da url mude*/
  },
  methods:{
    getMovieInfo: function () {
      eventHub.$once("movie-info", (data)=>{
        this.result = data.result;
      });

      eventHub.$emit("get-movie-info", {title:this.name});
    },
    dismiss: function () {
      eventHub.$emit("navigate-back");
    }
  },
  template: `
    <div class="movie-info">
      <Modal title="Filme">
        <div slot="content">
          <div class="columns" v-if="result">
            <div class="column col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
              <Poster :src="result.poster" :alt="result.show_title" />
            </div>
            <div class="column col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
              <h2>{{result.show_title}} ({{result.release_year}})</h2>
              <h4 v-if="result.director">Dirigido por: <span class="director">{{result.director}}</span></h4>
              <h4>Avaliação: {{result.rating}}</h4>
              <h4>Enredo</h4>
              <p>{{result.summary}}</p>
              <h4>Cast</h4>
              <p>{{result.show_cast}}</p>
            </div>
          </div>
        </div>
        <div slot="footer">
          <button @click.prevent.stop="dismiss" class="btn btn-primary">
            <Icon type="icon-arrow-left" /> voltar
          </button>
        </div>
      </Modal>
    </div>
  `
});