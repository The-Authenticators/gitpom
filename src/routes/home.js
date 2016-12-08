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
      // add cookie info here!
      getRepos(req.auth.credentials, (err, res, body) => {
        if (err) { throw err; }
        const currentUser = { userName: req.auth.credentials.userName };
        const repos = { repos: JSON.parse(body) };
        console.log(repos);
        rep.view('home', Object.assign(homeObj, repos, currentUser));
      });
    } else {
      rep.view('home', homeObj);
    }
  }
};
