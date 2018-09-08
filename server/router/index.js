const router = require('express').Router();
const path = require('path');
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

router.route('/api/messages')
  .get(MessageController.GET);

router.route('/*')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'), (err) => {
      if (err) {
        res.status(500).send(err)
      }
    })
  });

module.exports = {
  router: router
};
