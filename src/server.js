const Hapi = require('hapi');
const Inert = require('inert');
const env2 = require('env2');
const Vision = require('vision');
const Path = require('path');
const HapiCookie = require('hapi-auth-cookie');

const server = new Hapi.Server();

env2('./config.env');

const cookieOptions = {
  password: 'thisissoawesomewearetheauthenticatorsandwerock',
  cookie: 'ghAuthCookie',
  ttl: 24 * 60 * 60 * 1000,
  isSecure: process.env.NODE_ENV === 'PRODUCTION',
  isHttpOnly: true
};

server.connection({
  port: process.env.PORT || 8080,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '../public')
    }
  }
});

server.register([Inert, Vision, HapiCookie], (err) => {
  if (err) throw err;

  server.state('gitCookie', {
    ttl: 1000 * 60 * 60 * 24,
    isSecure: false,
    isHttpOnly: false,
    encoding: 'base64json',
    clearInvalid: false,
    strictHeader: true
  });

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: Path.join(__dirname, `../views`) ,
    path: '.',
    layoutPath: 'layout/',
    helpersPath: 'helpers/',
    partialsPath: 'partials/',
    layout: 'default'
  });
  server.auth.strategy('session', 'cookie', cookieOptions);
  server.route(require('./routes/index.js'));
});

module.exports = server;
