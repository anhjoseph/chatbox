const router = require('express').Router();
const { Authenticate } = require('../authentication');

router.route('/auth/login')
  .post(Authenticate.POST)

module.exports = {
  router: router
};