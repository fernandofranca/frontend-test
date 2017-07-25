const Vue = require('vue');
const Poster = require('./Poster.js');

const eventHub = require('../eventHub.js');

module.exports = Vue.component('MovieItem', {
  props: ['info', 'eventHub'],
  methods:{
    getMovieInfo: function(title) {
      eventHub.$emit("get-movie-info", {title:title});
    },
    getDirectorInfo: function(name) {
      eventHub.$emit("get-director-info", {name:name});
    },
    getActorInfo: function(name) {
      eventHub.$emit("get-actor-info", {name:name});
    },
  },
  computed:{
    movieCastArray: function () {
      if (!this.info || !this.info.show_cast) return [];
      return this.info.show_cast
        .split(',')
        .map(name => { return name.trim(); });
    }
  },
  template: `
  <div class="movie-item">
    <div class="columns">
      <div class="column col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <div @click="getMovieInfo(info.show_title)">
          <Poster :src="info.poster" :alt="info.show_title" />
        </div>
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
        <h3 @click="getMovieInfo(info.show_title)" class="title">{{info.show_title}} ({{info.release_year}})</h3>
        <h4 class="director" v-if="info.director">
          Dirigido por: <span class="director" @click="getDirectorInfo(info.director)">{{info.director}}</span>
        </h4>
        <div class="summary">
          <h4 class="rating">Avaliação: {{info.rating}}</h4>
          <p>{{info.summary}}</p>
        </div>
        <div class="cast">
          <h4>Cast</h4>
          <p>
            <span v-for="actorName in movieCastArray" class="actor"  @click="getActorInfo(actorName)">{{actorName}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  `
});