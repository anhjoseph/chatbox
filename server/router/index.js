const router = require('express').Router();
const { authenticate } = require('../utils/authenticate');
const { AuthenticationController } = require('../controllers/authentication');
const { UserController } = require('../controllers/users');
const { ChannelController } = require('../controllers/channels');
const { MessageController } = require('../controllers/messages');

router.route('/auth/signup')
  .post(AuthenticationController.signup);

router.route('/auth/login')
  .post(AuthenticationController.login);

router.all('/api/*', authenticate.verifyToken);

router.route('/api/users')
  .get(UserController.GET);

router.route('/api/channels')
  .get(ChannelController.GET)
  .post(ChannelController.POST);

router.route('/api/messages')
  .get(MessageController.GET);

module.exports = {
  router: router
};
