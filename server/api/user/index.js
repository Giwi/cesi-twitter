'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var User = require('./user.model');
var router = express.Router();
/**
 * @api {get} /api/users/ List users
 * @apiName List users
 * @apiGroup UsersAPI
 * @apiPermission admin
 * @apiHeader {String} Authorization access_token
 *
 * @apiSuccess {Array} response  List of users.
 */
router.get('/', auth.hasRole('admin'), controller.index);
/**
 * @api {get} /api/users/:id Delete user
 * @apiParam {String} id User id
 * @apiName Delete user
 * @apiGroup UsersAPI
 * @apiPermission admin
 * @apiHeader {String} access_token access_token
 *
 */
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
/**
 * @api {get} /api/users/me Get connected User
 * @apiName Get connected User
 * @apiGroup UsersAPI
 * @apiPermission logged
 * @apiHeader {String} Authorization access_token
 *
 * @apiSuccess {object} response User.
 */
router.get('/me', auth.isAuthenticated(), controller.me);
/**
 * @api {put} /api/users/:id/password Change password
 * @apiParam {String} id User id
 * @apiParam {String} oldPassword oldPassword
 * @apiParam {String} newPassword newPassword
 * @apiName Change password
 * @apiGroup UsersAPI
 * @apiPermission logged
 * @apiHeader {String} Authorization access_token
 *
 * @apiSuccess {object} response User.
 */
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
/**
 * @api {get} /api/users/:id User's detail
 * @apiParam {String} id User id
 * @apiName User's detail
 * @apiGroup UsersAPI
 * @apiPermission logged
 * @apiHeader {String} Authorization access_token
 *
 * @apiSuccess {object} response User.
 */
router.get('/:id', auth.isAuthenticated(), controller.show);
/**
 * @api {post} /api/users/ Create user
 * @apiParam {String} username User username
 * @apiParam {String} urlPhoto User urlPhoto
 * @apiParam {String} password User password
 * @apiName Create user
 * @apiGroup UsersAPI
 *
 * @apiSuccess {string} response token.
 */
router.post('/', controller.create);
/**
 * @api {post} /api/users/:id/update Change avatar
 * @apiParam {String} id User id
 * @apiParam {File} avatar avatar
 * @apiName Change avatar
 * @apiGroup UsersAPI
 * @apiPermission logged
 * @apiHeader {String} Authorization access_token
 *
 * @apiSuccess {String} Authorization access_token
 */
router.post('/:id/update', controller.update);


module.exports = router;
