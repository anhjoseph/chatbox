const router = require('express').Router();
const { Authenticate } = require('../controllers/authentication');
const { MessagesController } = require('../controllers/messages');

router.route('/auth/login')
  .post(Authenticate.login)

router.route('/auth/signup')
  .post(Authenticate.signup)

router.route('/api/messages')
  .get(MessagesController.GET)

module.exports = {
  router: router
};
