const axios = require('axios');

const apiURL = 'https://netflixroulette.net/api/api.php';

function _search(criteria, val) {
  return axios
    .get(`${apiURL}?${criteria}=${val}`)
    .then(function (response) {
      if (response && response.data){
        return response.data;
      } else {
        throw new Error("API responded without data.");
      }
    });
}

module.exports = class NetflixAPI {
  static searchTitle(_val){
    return _search('title', _val);
  }
  static searchDirector(_val){
    return _search('director', _val);
  }
  static searchActor(_val){
    return _search('actor', _val);
  }
}