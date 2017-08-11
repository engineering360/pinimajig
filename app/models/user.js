'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  fullName: String,
  city: {
    type: String,
    default: 'an unspecified location',
  },
});

// Mocha --watch breaks the require cache and mongoose will throw
// an error trying to initialize an model twice, so ignore this error
try {
  mongoose.model('User', userSchema);
  // eslint-disable-next-line no-empty
} catch (err) {}

module.exports = mongoose.model('User');
