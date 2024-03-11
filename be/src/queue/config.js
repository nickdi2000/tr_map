const Bull = require('bull');

const connectQueue = (name) =>
  new Bull(name, {
    redis: { port: 6379, host: 'localhost' },
  });

module.exports = { connectQueue };
