const Request = require('request');

module.exports = (user, cb) => {
  Request.get({
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'GitPom'
    }
  }, cb);
};
