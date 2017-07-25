import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes.js';

const eventHub = require('./eventHub.js');
const searchService = require('./services/SearchService.js');

// Componentes
const SearchBar = require('./components/SearchBar.js');
const Modal = require('./components/ui/Modal.js');
const ProgressWait = require('./components/ui/ProgressWait.js');

Vue.use(VueRouter);

const router = new VueRouter({ routes });

const app = new Vue({
  el: '#app',
  router: router,
  data:{
    isSearching:false,
    searchResult: null,
  },
  methods:{
    listen: function () {
      eventHub.$on("navigate-back", this.navigateBack);

      eventHub.$on("search-started", ()=> {
        this.isSearching = true;
      });

      eventHub.$on("search-ended", ()=> {
        this.isSearching = false;
      });

      eventHub.$on("search-result", (result)=> {
        this.searchResult = result;

        // >>>>>>
        if (result.type==='title'){
          
          // Verifica se esta na rota esperada antes de modificar, 
          // evitando duplicar entradas no history 
          let isAtExpectedRoute = router.currentRoute.fullPath===`/movie/${result.query}`;
          if (!isAtExpectedRoute) router.push({ path: `/movie/${result.query}`});

          eventHub.$emit("movie-info", this.searchResult);
        }
      });

      eventHub.$on("search-result-not-found", (details)=> {
        router.push({ path: '/no-results' });
        this.searchResult = null;
      });

      // >>>>>>
      eventHub.$on("get-movie-info", (data)=> {
        if (this.searchResult && this.searchResult.query===data.title){
          eventHub.$emit("movie-info", this.searchResult);
        } else {
          this.search('title', data.title);
        }
      })
    },
    search: function (type, text) {
      eventHub.$emit("search-start", {type, text});
    },
    navigateBack: function () {
      router.push({ path: '/'});
    }
  },
  created:function () {
    this.listen();
  },
  template:`
  <div class="app">
    <header class="navbar">
      <section class="navbar-section">
        PismoFlix
        <router-link to="/">favoritos</router-link>
      </section>
      <section class="navbar-section">
        <SearchBar :on-search="search"></SearchBar>
      </section>
    </header>
    <div class="router-view">
      <ProgressWait v-if="isSearching" title="Aguarde..." />
      <router-view></router-view>
    </div>
  </div>
  `
});