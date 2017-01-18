const abandonIssue = require('../lib/abandonIssue');

module.exports = {
  method: 'POST',
  path: '/abandon',
  config: {
    auth: {
      mode: 'try',
      strategy: 'session'
    }
  },
  handler: (req, rep) => {
    const issueDetails = req.payload;
    if (req.auth.isAuthenticated) {
      abandonIssue(Object.assign(req.auth.credentials, issueDetails), (err, res, body) => {
        if (err) throw err;
        rep.redirect('/');
      });
    }
  }
};
