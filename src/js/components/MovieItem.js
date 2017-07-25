const Vue = require('vue');
const Poster = require('./Poster.js');
const Icon = require('./ui/Icon.js');

const favService = require('../services/FavoriteService.js');
const eventHub = require('../eventHub.js');

module.exports = Vue.component('MovieItem', {
  props: ['info', 'eventHub'],
  data: function () {
    return {
      isFavorite: false,
    }
  },
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
    addToFav: function () {
      favService.add(this.info);
      this.updateFavoriteState();
    },
    removeFromFav: function () {
      favService.remove(this.info.show_id);
      this.updateFavoriteState();
    },
    updateFavoriteState: function () {
      if (!this.info || !this.info.show_id) return false;
      this.isFavorite = favService.isFavorite(this.info.show_id);
    }
  },
  mounted: function () {
    this.updateFavoriteState();
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
          <div v-if="isFavorite">
            <button @click.prevent.stop="removeFromFav" class="btn btn-remove-fav">
              <Icon type="icon-cross" /> Remover dos favoritos
            </button>
          </div>
          <div v-else>
            <button @click.prevent.stop="addToFav" class="btn btn-primary btn-add-fav">
              <Icon type="icon-plus" /> Adicionar aos favoritos
            </button>
          </div>
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