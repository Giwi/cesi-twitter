'use strict';

var express = require('express');
var controller = require('./message.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();
/**
 * @api {get} /api/messages/ List messages
 * @apiName List messages
 * @apiGroup MessagesAPI
 *
 * @apiSuccess {Array} response  List of messages.
 */
router.get('/', controller.index);
/**
 * @api {get} /api/messages/:id Message detail
 * @apiName Message detail
 * @apiGroup MessagesAPI
 * @apiParam {String} id message id
 *
 * @apiSuccess {Object} response  Message
 */
router.get('/:id', controller.show);
/**
 * @api {post} /api/messages Add message
 * @apiName Add message
 * @apiGroup MessagesAPI
 * @apiParam {String} message Message
 * @apiHeader {String} Authorization access_token
 *
 * @apiSuccess {Object} response  Message.
 */
router.post('/', auth.isAuthenticated(), controller.create);
/**
 * @api {put} /api/messages/:id Update message
 * @apiName Update message
 * @apiGroup MessagesAPI
 * @apiParam {String} message Message
 * @apiParam {String} id Id
 * @apiHeader {String} Authorization access_token
 *
 * @apiSuccess {Object} response  Message.
 */
router.put('/:id', auth.isAuthenticated(), controller.update);
/**
 * @api {delete} /api/messages/:id Delete message
 * @apiName Delete message
 * @apiGroup MessagesAPI
 * @apiParam {String} id Id
 * @apiHeader {String} Authorization access_token
 */
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
