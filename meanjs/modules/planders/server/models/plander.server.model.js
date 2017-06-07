'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Plander Schema
 */
var PlanderSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Plander name',
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
  helper: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  plant: {
    type: Schema.ObjectId,
    ref: 'Plant'
  },
  image: {
    type: String,
    default: 'modules/planders/client/img/default.png'
  },
  originalAuthor: {
    type:String
  },
  isPlantnet: {
    type: Boolean,
    default: false
  },
  done: {
    type: Boolean,
    default: false
  }

});

mongoose.model('Plander', PlanderSchema);
