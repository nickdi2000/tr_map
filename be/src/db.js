const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./config/logger');

//process.env.NODE_ENV = 'development';

const connectToDatabase = () => {
  return mongoose.connect(config.mongoose.url, config.mongoose.options);
};

module.exports = {
  connectToDatabase,
};
