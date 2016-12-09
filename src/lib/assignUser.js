const Request = require('request');

module.exports = (options, cb) => {
  const payload = { 'assignees': [ options.userName ] };

  Request.post({
    url: options.assignUrl,
    headers: {
      'User-Agent': 'GitPom',
      'Authorization': `token ${options.access_token}`
    },
    json: payload
  }, cb);
};
