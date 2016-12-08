const QueryString = require('querystring');

module.exports = {
  path: '/login',
  method: 'GET',
  config: {
    auth: {
      mode: 'try',
      strategy: 'session'
    }
  },
  handler: (req, rep) => {
    const gitUrl = `https://github.com/login/oauth/authorize`;
    const queryParams = QueryString.stringify({
      'client_id': process.env.CLIENT_ID,
      'redirect_uri': `${process.env.BASE_URL}/welcome`,
      'scope': `user public_repo`
    });
    rep.redirect(`${gitUrl}?${queryParams}`);
  }
};
