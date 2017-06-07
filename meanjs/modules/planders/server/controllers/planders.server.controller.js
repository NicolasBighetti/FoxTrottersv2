'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Plander = mongoose.model('Plander'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  _ = require('lodash');

/**
 * Create a Plander
 */
exports.create = function (req, res) {
  var plander = new Plander(req.body);
  plander.user = req.user;

  plander.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(plander);
    }
  });
};

/**
 * Show the current Plander
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var plander = req.plander ? req.plander.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  plander.isCurrentUserOwner = req.user && plander.user && plander.user._id.toString() === req.user._id.toString();

  res.jsonp(plander);
};

/**
 * Update a Plander
 */
exports.update = function (req, res) {
  var plander = req.plander;

  plander = _.extend(plander, req.body);

  plander.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(plander);
    }
  });
};

/**
 * Delete an Plander
 */
exports.delete = function (req, res) {
  var plander = req.plander;

  plander.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(plander);
    }
  });
};

/**
 * List of Planders
 */
exports.list = function (req, res) {
  Plander.find().sort('-created').populate('user', 'displayName').exec(function (err, planders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(planders);
    }
  });
};

/**
 * Plander middleware
 */
exports.planderByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Plander is invalid'
    });
  }

  Plander.findById(id).populate('user', 'displayName').exec(function (err, plander) {
    if (err) {
      return next(err);
    } else if (!plander) {
      return res.status(404).send({
        message: 'No Plander with that identifier has been found'
      });
    }
    req.plander = plander;
    next();
  });
};

/**
 * Upload a plant picture
 */
exports.uploadPicture = function (req, res) {
  var user = req.user;

  var plander = req.plander;


  if (!user) {
    res.status(401).send({
      message: 'User is not signed in'
    });
  }

  var multerConfig = config.uploads.profile.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
  var upload = multer(multerConfig).single('newProfilePicture');

  console.log('upload plander');
  console.log(plander);

  // Filtering to upload only images

  if (plander) {
    console.log('hey');
    upload(req, res, function (uploadError) {
      console.log('ho');

      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading plander picture' + uploadError
        });
      } else {
        console.log('ok2');
        plander.image = './modules/users/client/img/profile/uploads/' + req.file.filename;

        plander.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            console.log('OK ! ' + plander);
            res.json(plander);
          }
        });
      }
    });
  }
  else {
    res.status(400).send({
      message: 'Plander not found'
    });
  }
};

