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
    if (req.auth.isAuthenticated) {
      return rep('hello' + req.auth.credentials.access_token);
    }
    rep('hello');
  }
};
