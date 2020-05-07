const axios = require('axios');

githubService = {
  getRepo: (user, repository) => {
    return axios.get(`https://api.github.com/repos/${user}/${repository}`);
  }
}

module.exports = githubService;
