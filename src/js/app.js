import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes.js';

const eventHub = require('./eventHub.js');
const searchService = require('./services/SearchService.js');

// Componentes
const SearchBar = require('./components/SearchBar.js');
const Identity = require('./components/ui/Identity.js');
const ProgressWait = require('./components/ui/ProgressWait.js');
const FavoritosView = require('./components/FavoritosView.js');

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

      // Escuta evento de inicio de busca para exibir o comp de loader
      eventHub.$on("search-started", ()=> {
        this.isSearching = true;
      });

      // Escuta evento de termino de busca para ocultar o comp de loader
      eventHub.$on("search-ended", ()=> {
        this.isSearching = false;
      });

      // Escuta evento de resultado não encontrado para exibir view correspondente
      eventHub.$on("search-result-not-found", (details)=> {
        router.push({ path: '/no-results' });
        this.searchResult = null;
      });

      // Escuta eventos de requisições de infos
      this.listenInfoRequests();

      // Escuta eventos de resultados de infos
      this.listenInfoResults();
    },
    listenInfoResults: function () {
      eventHub.$on("search-result", (result)=> {
        this.searchResult = result;

        if (result.type==='title'){
          this.gotoResourceRoute('movie', result.query);
          eventHub.$emit("movie-info", this.searchResult); // Emite o evento que a view aguarda
        }

        if (result.type==='director'){
          this.gotoResourceRoute('director', result.query);
          eventHub.$emit("director-info", this.searchResult); // Emite o evento que a view aguarda
        }

        if (result.type==='actor'){
          this.gotoResourceRoute('actor', result.query);
          eventHub.$emit("actor-info", this.searchResult); // Emite o evento que a view aguarda
        }
      });
    },
    listenInfoRequests: function () {
      // Aguarda evento de requisição de infos
      // Se já tem essa info no model emite evento imediatamente
      // Do contrário inicia uma busca
      eventHub.$on("get-movie-info", (data)=> {
        if (this.searchResult && this.searchResult.query===data.title){
          this.gotoResourceRoute('movie', data.title);
          eventHub.$emit("movie-info", this.searchResult);
        } else {
          this.search('title', data.title);
        }
      });

      eventHub.$on("get-director-info", (data)=> {
        if (this.searchResult && this.searchResult.query===data.name){
          this.gotoResourceRoute('director', data.name);
          eventHub.$emit("director-info", this.searchResult);
        } else {
          this.search('director', data.name);
        }
      });

      eventHub.$on("get-actor-info", (data)=> {
        if (this.searchResult && this.searchResult.query===data.name){
          this.gotoResourceRoute('actor', data.name);
          eventHub.$emit("actor-info", this.searchResult);
        } else {
          this.search('actor', data.name);
        }
      });
    },
    search: function (type, text) {
      eventHub.$emit("search-start", {type, text});
    },
    gotoResourceRoute: function (type, query) {
      let isAtExpectedRoute = router.currentRoute.fullPath===`/${type}/${query}`;
      if (!isAtExpectedRoute) router.push({ path: `/${type}/${query}`});
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
      <Identity />
      <section class="navbar-section">
        <SearchBar :on-search="search" />
      </section>
    </header>
    <div class="router-view">
      <router-view></router-view>
      <FavoritosView />
    </div>
    <ProgressWait v-if="isSearching" title="Aguarde..." />
  </div>
  `
});