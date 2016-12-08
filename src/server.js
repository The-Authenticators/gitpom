const Hapi = require('hapi');
const Inert = require('inert');
const env2 = require('env2');
const Vision = require('vision');
const Path = require('path');
const jwt2 = require('hapi-auth-jwt2');

const server = new Hapi.Server();

env2('./config.env');

const validate = (decoded, request, cb) => {
  cb(null, true);
};

server.connection({
  port: process.env.PORT || 8080,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '../public')
    }
  }
});

server.register([Inert, Vision, jwt2], (err) => {
  if (err) throw err;

  // server.state('gitCookie', {
  //   ttl: 1000 * 60 * 60 * 24,
  //   isSecure: false,
  //   isHttpOnly: false,
  //   encoding: 'base64json',
  //   clearInvalid: false,
  //   strictHeader: true
  // });

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: '../views',
    layoutPath: '../views/layout/',
    helpersPath: '../views/helpers/',
    partialsPath: '../views/partials/',
    layout: 'default'
  });
  server.auth.strategy('jwt', 'jwt', true, {
    key: process.env.KEY,
    validateFunc: validate,
    verifyOptions: { ignoreExpiration: true, algorithms: ['HS256'] }
  });
  server.route(require('./routes/index.js'));
});

module.exports = server;
