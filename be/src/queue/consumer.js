/* eslint-disable no-console */
const { connectToDatabase } = require('../db');

process.env.NODE_ENV = 'development';

connectToDatabase();

const { handlerFailure, handlerCompleted, handlerStalled } = require('./handler');
const { connectQueue } = require('./config');
const fs = require('fs');
const path = require('path');
const { aiService, llamaService } = require('../services/');
const { Datapoint } = require('../models');

const nameQueue = 'ai-producer';

const cases = connectQueue(nameQueue);

const processJob = async (job, done) => {
  try {
    console.info(`running job! with id ${job.id}`);
    const { text } = job.data;
    console.log("Consumer running index..");
    const rec = await llamaService.createIndex();
    console.log("Completed", rec);
    done(null, 'success');
  } catch (error) {
    done(null, error);
  }
};

async function insertAiData(text){
  const datapointArray = await aiService.buildDatapoint(text);
  console.log('datapointArray', datapointArray);
  try {
    const records = await Datapoint.insertMany(datapointArray);
  } catch (e) {
    console.log('DB INSERT FAILED', e);
    done(null, e);
  }

  console.log('Inserted', records);
  return records;
}

const initJob = () => {
  console.info('Queue is working!');
  cases.process(processJob);
  cases.on('failed', handlerFailure);
  cases.on('completed', handlerCompleted);
  cases.on('stalled', handlerStalled);
};

connectToDatabase()
  .then(() => {
    initJob();
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });
