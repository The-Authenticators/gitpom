const Request = require('request');
const env2 = require('env2');
const HapiCookie = require('hapi-auth-cookie');

env2('./config.env');

module.exports = {
  path: '/welcome',
  method: 'GET',
  handler: (req, rep) => {
    const accessUrl = `https://github.com/login/oauth/access_token`;
    Request.post({
      headers: {
        accept: 'application/json'
      },
      url: accessUrl,
      form: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code
      }
    }, (err, res, body) => {
      if (err) throw err;
      const parsed = JSON.parse(body);
      const userDetails = {
        access_token: parsed.access_token
      };
      req.cookieAuth.set({access_token: userDetails.access_token});
      rep.redirect('/');
    });
  }
};
