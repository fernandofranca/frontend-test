const Vue = require('vue');
const Modal = require('./ui/Modal.js');
const Icon = require('./ui/Icon.js');
const MovieItem = require('./MovieItem.js');

const eventHub = require('../eventHub.js');
const sortOnYear = require('../utils/sortOnYear.js');

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
    }
  },
  mounted: function () {
    this.getInfo(this.name); /* Faz outra busca caso o param da url mude*/
  },
  methods:{
    getInfo: function () {
      eventHub.$once("actor-info", (data)=>{
        this.result = data.result.sort(sortOnYear);
      });

      eventHub.$emit("get-actor-info", {name:this.name});
    },
    dismiss: function () {
      eventHub.$emit("navigate-back");
    }
  },
  template: `
    <div class="actor-info">
      <Modal :title="'Ator: ' + name">
        <div slot="content" v-if="result">
          <MovieItem :info="info" v-for="info in result" :key="info.show_id"/>
        </div>
        <div slot="footer">
          <button @click.prevent.stop="dismiss" class="btn btn-primary">
            <Icon type="icon-arrow-left" /> fechar
          </button>
        </div>
      </Modal>
    </div>
  `
});