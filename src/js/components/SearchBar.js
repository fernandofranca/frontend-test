const Vue = require('vue');

module.exports = Vue.component('SearchBar', {
  props: ['onSearch'],
  data: function () {
    return {
      type:"title",
      text:"",
    }
  },
  methods:{
    search: function () {
      if (this.text.length>=2) this.onSearch(this.type, this.text);
    }
  },
  template: `
  <form @submit.prevent.stop="search">
    <div class="input-group input-inline search-bar">
      <input class="form-input" type="text" placeholder="Busca" v-model="text" />
      <select class="form-select" v-model="type">
        <option value="title">Título</option>
        <option value="director">Diretor</option>
        <option value="actor">Ator</option>
      </select>
      <button ref="button" @click.prevent.stop="search" class="btn btn-primary input-group-btn">Busca</button>
    </div>
  </form>
  `
});