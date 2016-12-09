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
    const body = JSON.parse(req.payload);
    const issueDetails = { issueUrl: body.issueUrl };
    if (req.auth.isAuthenticated) {
      abandonIssue(Object.assign(req.auth.credentials, issueDetails), (err, res, body) => {
        if (err) throw err;
        rep.redirect('/');
      });
    }
  }
};
