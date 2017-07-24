import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes.js';

Vue.use(VueRouter);

const app = new Vue({
  el: '#app',
  router: new VueRouter({ routes }),
  template:`
  <div class="app">
    <header class="navbar">
      <section class="navbar-section">
        PismoFlix
        <router-link to="/">favoritos</router-link>
        <router-link to="/search-results">search results</router-link>
        <router-link to="/movie-info">movie info</router-link>
      </section>
      <section class="navbar-section">
        <div class="input-group input-inline">
          <input class="form-input" type="text" placeholder="Busca" />
          <button class="btn btn-primary input-group-btn">Busca</button>
        </div>
      </section>
    </header>
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
  `
});