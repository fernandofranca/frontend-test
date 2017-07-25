const FavoritosList = require('./components/FavoritosList.js');
const NoResults = require('./components/NoResults.js');
const MovieInfo = require('./components/MovieInfo.js');
const DirectorInfo = require('./components/DirectorInfo.js');


export default [
  { path: '/', component: FavoritosList },
  { path: '/no-results', component: NoResults },
  { path: '/movie/:name', 
    component: MovieInfo, 
    props: true
  },
  { path: '/director/:name', 
    component: DirectorInfo, 
    props: true
  }
]