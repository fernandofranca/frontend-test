import FavoritosList from './components/FavoritosList.js';
import SearchResults from './components/SearchResults.js';
import MovieInfo from './components/MovieInfo.js';


export default [
  { path: '/', component: FavoritosList },
  { path: '/search-results', component: SearchResults },
  { path: '/movie-info', component: MovieInfo }
]