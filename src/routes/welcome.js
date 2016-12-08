const Request = require('request');
const env2 = require('env2');
const HapiCookie = require('hapi-auth-cookie');
const jwt = require('jsonwebtoken');

env2('./config.env');

const cookieOptions = {
  ttl: 24 * 60 * 60 * 1000,
  isSecure: process.env.NODE_ENV === 'PRODUCTION',
  isHttpOnly: true,
  path: '/',
  encoding: 'none'
};

module.exports = {
  path: '/welcome',
  method: 'GET',
  config: {
    auth: {
      mode: 'try'
    }
  },
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
      let parsed = JSON.parse(body);
      const gitHubAccessToken = parsed.access_token;
      Request.get({
        headers: {
          'User-Agent': 'GitPom',
          // as recommended by the API documentation
          Accept: `application/vnd.github.v3+json`,
          Authorization: `token ${gitHubAccessToken}`
        },
        url: `https://api.github.com/user`
      }, (err, res, body) => {
        if (err) throw err;
        parsed = JSON.parse(body);
        const userDetails = {
          userName: parsed.login,
          avatarUrl: parsed.avatar_url,
          accessToken: gitHubAccessToken
        };
        // make a jwt : (payload, key, options)
        const webToken = jwt.sign(userDetails, process.env.KEY, {});
        rep.redirect('/').header('Authorization', webToken);
        // .state('jwt', webToken, cookieOptions);
      });
    });
  }
};
