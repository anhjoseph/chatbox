const router = require('express').Router();
const { Authenticate } = require('../authentication');

router.route('/auth/login')
  .post(Authenticate.login)

router.route('/auth/signup')
  .post(Authenticate.signup)

module.exports = {
  router: router
};