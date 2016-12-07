module.exports = {
  path: '/logout',
  method: 'GET',
  handler: (req, rep) => {
    rep('login out!');
  }
};
