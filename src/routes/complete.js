const completeIssue = require('../lib/completeIssue');

module.exports = {
  method: 'POST',
  path: '/complete',
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
      completeIssue(Object.assign(req.auth.credentials, issueDetails), (err, res, body) => {
        if (err) throw err;
        rep.redirect('/');
      });
    }
  }
};
