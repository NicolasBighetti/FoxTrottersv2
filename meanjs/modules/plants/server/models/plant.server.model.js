'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Plant Schema
 */
var PlantSchema = new Schema({
  commonName: {
    type: String,
    default: '',
    required: 'Please fill Plant name',
    trim: true
  }, latinName: {
    type: String,
    default: '',
    trim: true
  }, uses: {
    type: [Schema.ObjectId],
    default: []
  }, pois: {
    type: [Schema.ObjectId],
    default: []

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

mongoose.model('Plant', PlantSchema);
