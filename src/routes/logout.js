module.exports = {
  path: '/logout',
  method: 'GET',
  handler: (req, rep) => {
    req.cookieAuth.clear();
    rep.redirect('/');
  }
};
