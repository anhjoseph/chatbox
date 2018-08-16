const router = require('express').Router();
const { Authenticate } = require('../authentication');

router.route('/auth/login')
  .post(Authenticate.Login)

router.route('/auth/signup')
  .post(Authenticate.Signup)

module.exports = {
  router: router
};