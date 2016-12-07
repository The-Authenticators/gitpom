const server = require('../src/server.js');
const tape = require('tape');

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
