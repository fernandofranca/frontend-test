const Vue = require('vue');

module.exports = Vue.component('Poster', {
  props: ['alt', 'src'],
  data: function () {
    return {
      hasFailed: false
    };
  },
  methods:{
    handleError:function () {
      this.hasFailed = true;
    }
  },
  template: `
  <div class="poster">
    <img :src="src" :alt="alt" class="poster" @error="handleError" v-if="!hasFailed"/>
    <div v-if="hasFailed" class="failed"></div>
  </div>
  `
});