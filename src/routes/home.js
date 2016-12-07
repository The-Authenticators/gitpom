module.exports = {
  path: '/',
  method: 'GET',
  handler: (req, rep) => {
    rep('hello');
  }
};
