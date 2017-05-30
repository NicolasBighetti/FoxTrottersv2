'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Plant Schema
 */
var UseSchema = new Schema({
  theme: {
    type: String,
    default: '',
    required: 'Please fill theme',
    trim: true
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

mongoose.model('UseSchema', UseSchema);
