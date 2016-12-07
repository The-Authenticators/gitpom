const Hapi = require('hapi');
const Inert = require('inert');
const env = require('env2')('./config.env');
const Vision = require('vision');
const Path = require('path');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8080,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '../public')
    }
  }
});

server.register([Inert, Vision], (err) => {
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
    relativeTo: __dirname,
    path: '../views',
    layoutPath: '../views/layout/',
    helpersPath: '../views/helpers/',
    partialsPath: '../views/partials/',
    layout: 'default'
  });

  server.route(require('./routes/index.js'));
});

module.exports = server;
