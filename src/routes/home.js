const getRepos = require('../lib/getRepos.js');

module.exports = {
  path: '/',
  method: 'GET',
  config: {
    auth: {
      mode: 'try',
      strategy: 'jwt'
    }
  },
  handler: (req, rep) => {
    const homeObj = {
      title: 'GitPom - welcome!',
      loggedIn: !(req.auth)
    };

    console.log(req.auth);

    if (req.auth.isAuthenticated) {
      // add cookie info here!
      getRepos(req.auth.credentials.userName, (err, res, body) => {
        if (err) { throw err; }
        const currentUser = { userName: req.auth.credentials.userName };
        const repos = { repos: JSON.parse(body) };
        rep.view('home', Object.assign(homeObj, repos, currentUser));
      });
    } else {
      rep.view('home', homeObj);
    }
  }
};
