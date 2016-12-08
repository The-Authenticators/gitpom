const getIssues = require('../lib/getIssues');

module.exports = {
  method: 'GET',
  path: '/repo',
  config: {
    auth: {
      mode: 'try',
      strategy: 'session'
    }
  },
  handler: (req, rep) => {
    const homeObj = {
      title: 'GitPom - welcome!',
      loggedIn: req.auth.isAuthenticated
    };

    const userSelection = {
      repoOwner: req.query.repo.split(' ')[0],
      repoName: req.query.repo.split(' ')[1],
      repoUrl: function () { return `https://github.com/${this.repoOwner}/${this.repoName}/issues`; }
    };
    if (req.auth.isAuthenticated) {
      getIssues(Object.assign(req.auth.credentials, userSelection), (err, res, body) => {
        if (err) throw err;
        const issues = { issues: JSON.parse(body) };
        rep.view('issues', Object.assign(homeObj, req.auth.credentials, userSelection, issues));
      });
    }
  }
};
