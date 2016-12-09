const Request = require('request');

module.exports = (options, cb) => {
  const headers = {
    'User-Agent': 'GitPom',
    'Authorisation': `token ${options.access_token}`
  };
  const labelUrl = options.issueUrl + '/labels';
  const newLabelPayload = [ 'Ready for Review' ];
  Request.delete({
    url: options.issueUrl,
    headers: headers
  }, (err, res, body) => {
    if (err) cb(err);
    else {
      console.log(res, body);
      Request.post({
        url: labelUrl,
        headers: headers,
        json: newLabelPayload
      }, cb);
    }
  });
};
