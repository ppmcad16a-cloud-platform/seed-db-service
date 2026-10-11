require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');

// Connects to MongoDB and WAITS for the connection. A failure is re-thrown,
// so index.js can stop and exit with a non-zero code (a Kubernetes Job then
// shows as Failed instead of silently "Completed").
const setupDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
  } catch (error) {
    console.log(`${chalk.red('x')} ${chalk.red('MongoDB connection failed')}`);
    throw error;
  }
};

module.exports = setupDB;
