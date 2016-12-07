module.exports = {
  path: '/',
  method: 'GET',
  handler: (req, rep) => {
    const homeObj = {
      title: 'GitPom - welcome!',
      loggedIn: req.auth.credentials.isAuthenticated
    };
    rep.view('home', {homeObj});
  }
};
