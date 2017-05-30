'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ditu Schema
 */
var DituSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Ditu name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  pois: {
    type: [Schema.ObjectId],
    ref: 'Poi',
    default: []
  }
});

mongoose.model('Ditu', DituSchema);
