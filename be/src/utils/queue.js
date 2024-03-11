const Queue = require('bull');

console.log('executing queue');

const queue = new Queue('embed-queue', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
});

module.exports = queue;
