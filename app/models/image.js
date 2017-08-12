'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
});

// Mocha --watch breaks the require cache and mongoose will throw
// an error trying to initialize an model twice, so ignore this error
try {
  mongoose.model('Image', imageSchema);
  // eslint-disable-next-line no-empty
} catch (err) {}

module.exports = mongoose.model('Image');

