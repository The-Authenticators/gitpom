const server = require('../src/server.js');
const tape = require('tape');
const url = require('url');
tape('Test that the server starts', (t) => {
  server.start((err) => {
    if (err) {
      t.error('error when starting server', err);
    } else {
      t.ok('The server should start');
    }
    server.stop(() => { t.end(); });
  });
});

tape('login redirects to github', (t) => {
  const options = {
    method: 'GET',
    url: '/login'
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 302, 'status code should be redirect, 302');
    const actual = url.parse(res.headers.location);
    t.equal(`${actual.protocol}${actual.host}${actual.pathname}`,
      `https:github.com/login/oauth/authorize`,
      `redirect url should match expected`);
    t.end();
  });
});
