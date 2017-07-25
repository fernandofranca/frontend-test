const Vue = require('vue');
const Poster = require('./Poster.js');

module.exports = Vue.component('MovieItem', {
  props: ['info', 'onClick'],
  methods:{
    handleClick: function (title) {
      if(this.onClick) this.onClick(title);
    }
  },
  template: `
  <div class="movie-item" @click="handleClick(info.show_title)">
    <div class="columns">
      <div class="column col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <Poster :src="info.poster" :alt="info.show_title" />
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
        <h3>{{info.show_title}} ({{info.release_year}})</h3>
        <h4>Avaliação: {{info.rating}}</h4>
        <p>{{info.summary}}</p>
      </div>
    </div>
  </div>
  `
});