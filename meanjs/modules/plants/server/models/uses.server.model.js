'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Plant Schema
 */
var UsesSchema = new Schema({
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

mongoose.model('UsesSchema', UsesSchema);
