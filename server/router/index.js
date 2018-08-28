const router = require('express').Router();
const { Authenticate } = require('../controllers/authentication');
const { MessageController } = require('../controllers/messages');
const { ChannelController } = require('../controllers/channels');
const { UserController } = require('../controllers/users');

router.route('/auth/login')
  .post(Authenticate.login)

router.route('/auth/signup')
  .post(Authenticate.signup)

router.route('/api/messages')
  .get(MessageController.GET)

router.route('/api/channels')
  .get(ChannelController.GET)
  .post(ChannelController.POST)

router.route('/api/users')
  .get(UserController.GET)

module.exports = {
  router: router
};
