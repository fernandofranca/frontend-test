const FavoritosList = require('./components/FavoritosList.js');
const NoResults = require('./components/NoResults.js');
const MovieInfo = require('./components/MovieInfo.js');


export default [
  { path: '/', component: FavoritosList },
  { path: '/no-results', component: NoResults },
  { path: '/movie/:name', 
    component: MovieInfo, 
    props: true
  }
]