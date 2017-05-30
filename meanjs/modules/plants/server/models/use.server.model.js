'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Use Schema
 */
var UseSchema = new Schema({
  theme: {
    type: [Schema.ObjectId],
    ref: 'Theme',
    default: []
  },
  desc: {
    type: String,
    default: '',
    required: 'Please fill desc',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Use', UseSchema);
