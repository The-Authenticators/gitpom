const Request = require('request');

module.exports = (options, cb) => {
  const headers = {
    'User-Agent': 'GitPom',
    'Authorization': `token ${options.access_token}`
  };
  const assignUrl = options.issueUrl + '/assignees';
  const labelUrl = options.issueUrl + '/labels';
  const assignPayload = { 'assignees': [ options.userName ] };
  const labelPayload = [ 'In Progress' ];

  Request.post({
    url: assignUrl,
    headers: headers,
    json: assignPayload
  }, (err, res, body) => {
    if (err) cb(err);
    else {
      Request.post({
        url: labelUrl,
        headers: headers,
        json: labelPayload
      }, cb);
    }
  });
};
