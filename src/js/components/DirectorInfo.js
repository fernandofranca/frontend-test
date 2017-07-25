const Vue = require('vue');
const Modal = require('./ui/Modal.js');
const Icon = require('./ui/Icon.js');
const MovieItem = require('./MovieItem.js');

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
      this.getInfo();
    // TODO
    }
  },
  mounted: function () {
    this.getInfo(this.name); /* Faz outra busca caso o param da url mude*/
  },
  methods:{
    getInfo: function () {
      eventHub.$once("director-info", (data)=>{
        this.result = data.result;
      });

      eventHub.$emit("get-director-info", {name:this.name});
    },
    getMovieInfo: function(title) {
      eventHub.$emit("get-movie-info", {title:title});
    },
    dismiss: function () {
      eventHub.$emit("navigate-back");
    }
  },
  template: `
    <div class="director-info">
      <Modal title="Diretor">
        <div slot="content">
          <div v-if="result">
            <h2>{{name}}</h2>
            <div v-for="info in result">
              <MovieItem :info="info" :onClick="getMovieInfo"/>
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