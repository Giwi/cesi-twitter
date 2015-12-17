/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /message              ->  index
 * POST    /message              ->  create
 * GET     /message/:id          ->  show
 * PUT     /message/:id          ->  update
 * DELETE  /message/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Message = require('./message.model');

// Get list of Messages
exports.index = function(req, res) {
  Message.find(function (err, Messages) {}).populate('user').lean().exec(function(err, Messages) {
    if(err) { return handleError(res, err); }
    var listOfMess = [];
    Messages.forEach(function (i) {
      if(!!i.user.avatar && !!i.user.avatar.contentType) {
        i.user.avatar.url = i.user.avatar.data.toString('base64');
      }
      listOfMess.push(i);
    });
    return res.status(200).json(listOfMess);
  });
};

// Get a single Message
exports.show = function(req, res) {
  Message.findById(req.params.id, function (err, Message) {
    if(err) { return handleError(res, err); }
    if(!Message) { return res.status(404).send('Not Found'); }
    return res.json(Message);
  }).populate('user');
};

// Creates a new Message in the DB.
exports.create = function(req, res) {
  req.body.user = req.user;
  req.body.date = new Date();
  Message.create(req.body, function(err, Message) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(Message);
  });
};

// Updates an existing Message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Message.findById(req.params.id, function (err, Message) {
    if (err) { return handleError(res, err); }
    if(!Message) { return res.status(404).send('Not Found'); }
    var updated = _.merge(Message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(Message);
    });
  }).populate('user');
};

// Deletes a Message from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, Message) {
    if(err) { return handleError(res, err); }
    if(!Message) { return res.status(404).send('Not Found'); }
    Message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  }).populate('user');
};

function handleError(res, err) {
  return res.status(500).send(err);
}
