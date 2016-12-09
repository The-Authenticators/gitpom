const assignUser = require('../lib/assignUser');

module.exports = {
  method: 'POST',
  path: '/assign',
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
      assignUser(Object.assign(req.auth.credentials, issueDetails), (err, res, body) => {
        if (err) throw err;
        console.log(res, body);
      });
    }
  }
};
