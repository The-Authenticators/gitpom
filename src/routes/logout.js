module.exports = {
  path: '/logout',
  method: 'GET',
  config: {
    auth: {
      mode: 'try',
      strategy: 'jwt'
    }
  },
  handler: (req, rep) => {
    rep.redirect('/').unstate('jwt', {});
  }
};
