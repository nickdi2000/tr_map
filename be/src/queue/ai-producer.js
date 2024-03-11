const { connectQueue } = require('./config');
const { Datapoint } = require('../models');

const jobOptions = {
  //jobId,
  removeOnComplete: true,
  attempts: 3,
};

const nameQueue = 'ai-producer';

const init = async (data) => {
  console.log('Ai producer..', data.record_id);
  return await connectQueue(nameQueue).add(data, jobOptions);
};

const addRequest = async (data, record_id = 0) => {

  console.log('Adding for ', data, record_id);
  data.record_id = record_id;
  init(data).then((res) => {
    console.info(res.data.text);
  });
};

module.exports = {
  addRequest,
};
