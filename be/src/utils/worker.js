const queue = require('./queue');

console.log('starting worker.js');

queue.process(async (job) => {
  console.log('consumed job');
  // Process the job data
  console.log(job.data);
});
