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
    rep.view('home', homeObj);
  }
};
