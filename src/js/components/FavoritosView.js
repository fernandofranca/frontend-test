const Vue = require('vue');

const favService = require('../services/FavoriteService.js');

module.exports = Vue.component('FavoritosView', {
  data: function () {
    return {
      favorites: favService.asArray(),
    }
  },
  mounted: function () {
    favService.$on('updated', (data)=> {
      this.favorites = data.items.sort((a, b) => {
        return b.addedToFavoriteTimestamp - a.addedToFavoriteTimestamp;
      })
    })
  },
  template: `
  <div class="favoritos-view">
    <div class="list" v-if="favorites.length>0">
      <h2>Favoritos</h2>
      <MovieItem :info="info" v-for="info in favorites" :key="info.show_id"/>
    </div>
    <div class="empty" v-else>
      <div class="empty-icon">
        <i class="icon icon-menu"></i>
      </div>
      <h4 class="empty-title">Você ainda não tem filmes favoritos.</h4>
    </div>
  </div>`
});