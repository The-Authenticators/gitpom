const getIssueDetails = require('../lib/getIssueDetails');
const marked = require('marked');

module.exports = {
  method: 'GET',
  path: '/issue',
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

    const issueUrl = { issueUrl: req.query.url };

    if (req.auth.isAuthenticated) {
      getIssueDetails(Object.assign(req.auth.credentials, issueUrl), (err, res, body) => {
        if (err) throw err;
        const issueDetails = { issueDetails: JSON.parse(body) };
        const parsedBody = { parsedBody: marked(issueDetails.issueDetails.body) };
        const parsedDate = { parsedDate: issueDetails.issueDetails.created_at.replace(/T/, ' ').replace(/Z/, '') };
        rep.view('issue_details', Object.assign(homeObj, req.auth.credentials, issueDetails, parsedBody, parsedDate));
      });
    }
  }
};
