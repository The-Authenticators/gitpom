module.exports = {
  method: 'GET',
  path: '/{file*}',
  handler: {
    directory: {
      path: '.'
    }
  }
};
