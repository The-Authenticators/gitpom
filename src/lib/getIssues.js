const Request = require('request');

module.exports = (options, cb) => {
  Request.get({
    url: `https://api.github.com/repos/${options.repoOwner}/${options.repoName}/issues`,
    headers: {
      'User-Agent': 'GitPom',
      Accept: `application/vnd.github.v3+json`,
      Authorization: `token ${options.access_token}`
    }
  }, cb);
};
