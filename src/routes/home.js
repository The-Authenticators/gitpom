const getRepos = require('../lib/getRepos.js');

module.exports = {
  path: '/',
  method: 'GET',
  config: {
    auth: {
      mode: 'try', // try to go to page even if the strategy is not loaded
      strategy: 'session'
    }
  },
  handler: (req, rep) => {
    const homeObj = {
      title: 'GitPom - welcome!',
      loggedIn: req.auth.isAuthenticated
    };

    if (req.auth.isAuthenticated) {
      getRepos('jwhiles', (err, res, body) => {
        if (err) { throw err; }
        const repos = { repos: JSON.parse(body) };
        rep.view('home', Object.assign(homeObj, repos));
      });
    } else {
      rep.view('home', homeObj);
    }
  }
};
