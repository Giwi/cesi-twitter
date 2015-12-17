'use strict';

var mongoose = require('mongoose'),
  User = require('../user/user.model'),
  Schema = mongoose.Schema;

var MessageSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date,
  message: String
});

module.exports = mongoose.model('Message', MessageSchema);
