const Request = require('request');

module.exports = (options, cb) => {
  const headers = {
    'User-Agent': 'GitPom',
    'Authorization': `token ${options.access_token}`
  };
  const assignUrl = options.issueUrl + '/assignees';
  const labelUrl = options.issueUrl + '/labels/In%20Progress';
  const assignPayload = { 'assignees': [ options.userName ] };

  Request.delete({
    url: assignUrl,
    headers: headers,
    json: assignPayload
  }, (err, res, body) => {
    if (err) cb(err);
    else {
      Request.delete({
        url: labelUrl,
        headers: headers
      }, cb);
    }
  });
};
