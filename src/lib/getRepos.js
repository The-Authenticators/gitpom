const Request = require('request');

module.exports = (user, cb) => {
  Request.get({
    url: `https://api.github.com/users/${user.userName}/repos`,
    headers: {
      'User-Agent': 'GitPom',
      Accept: `application/vnd.github.v3+json`,
      Authorization: `token ${user.access_token}`
    }
  }, cb);
};
