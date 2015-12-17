/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var message = require('./message.model');

exports.register = function (socket) {
  message.schema.post('save', function (doc) {
    message.findById(doc.id, function (err, Message) {
      if (err) {
        return handleError(res, err);
      }
      if (!Message) {
        return res.status(404).send('Not Found');
      }
      onSave(socket, Message);
    }).populate('user');

  });
  message.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('messages:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('messages:remove', doc);
}
