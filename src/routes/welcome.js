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
        // as recommended by the API documentation
        Accept: `application/vnd.github.v3+json`
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
      const userToken = {
        access_token: parsed.access_token
      };
      Request.get({
        headers: {
          'User-Agent': 'GitPom',
          // as recommended by the API documentation
          Accept: `application/vnd.github.v3+json`,
          Authorization: `token ${userToken.access_token}`
        },
        url: `https://api.github.com/user`
      }, (err, res, body) => {
        if (err) throw err;
        parsed = JSON.parse(body);
        const userDetails = {
          userName: parsed.login,
          avatarUrl: parsed.avatar_url
        };
        // set the cookie containing the token, the username and the avatar url
        req.cookieAuth.set(Object.assign(userToken, userDetails));
        rep.redirect('/');
      });
    });
  }
};
