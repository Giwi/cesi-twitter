/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function (app) {

  /**
   * @api {post} /ping Ping
   * @apiName ping
   * @apiGroup MainRouter
   *
   * @apiSuccess {String} response pong.
   */
  app.post('/ping', function (req, res) {
    res.setHeader('Content-Type', 'text/json');
    res.json({message: 'pong'});
  });
  /**
   * @api {get} /hello/:name Hello
   * @apiParam name Name
   * @apiName hello
   * @apiGroup MainRouter
   *
   * @apiSuccess {String} response hello name.
   */
  app.get('/hello/:name', function (req, res) {
    res.setHeader('Content-Type', 'text/json');
    console.log('hello ' + req.params.name);
    res.json({message: 'hello ' + req.params.name});
  });

  // Insert routes below
  app.use('/api/messages', require('./api/messages'));
  app.use('/api/users', require('./api/user'));

  app.use('/api/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function (req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
