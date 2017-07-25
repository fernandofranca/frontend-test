const Vue = require('vue');

module.exports = new Vue({
  data:{
    userFavorites: {}
  },
  methods:{
    /**
     * Verifica se está nos favoritos
     * @param  {[type]}  id Corresponde ao show_id retornado pela API
     * @return {Boolean}
     */
    isFavorite: function(id){
      return this.userFavorites[id] ? true : false;
    },
    add: function(info){
      if (!info || !info.show_id) return;
      if (this.isFavorite(info.show_id)) return;

      info.addedToFavoriteTimestamp = Date.now();

      this.userFavorites[info.show_id] = info;
      this.emitUpdateEvent();
    },
    remove: function(id){
      if (!this.isFavorite(id)) return;

      delete this.userFavorites[id];
      this.emitUpdateEvent();
    },
    clear: function(){
      this.userFavorites = {};
      this.emitUpdateEvent();
    },
    asArray: function(){
      return Object.keys(this.userFavorites).map((key) => {
        return this.userFavorites[key];
      });
    },
    emitUpdateEvent: function () {
      this.$emit('updated', {items:this.asArray()});
    }
  },
  computed:{
  }
});

/*
var userFavorites = {};
module.exports = class FavoriteService {
  static isFavorite(id){
    return userFavorites[id] ? true : false;
  }
  static add(info){
    if (!info || !info.show_id) return;
    if (FavoriteService.isFavorite(info.show_id)) return;

    userFavorites[info.show_id] = info;
  }
  static remove(id){
    if (!FavoriteService.isFavorite(id)) return;

    delete userFavorites[id];
  }
  static asArray(){
    return Object.keys(userFavorites).map((key) => {
      return userFavorites[key];
    });
  }
  static clear(){
    userFavorites = {};
  }
}
*/