'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error);

module.exports = db;
