const bcrypt = require('bcrypt-nodejs');
const { User } = require('../../db/models');
const { authenticate } = require('../utils/authenticate');

const AuthenticationController = {
  login: (req, res) => {
    User.findOne({ where: {
      username: req.body.username
    }}).then(user => {
      user.update({ status: true }).then(updatedUser => {
        if (bcrypt.compareSync(req.body.password, updatedUser.dataValues.password)) {
          let token = authenticate.generateToken(updatedUser.username);
          res.status(200).send({ token: token });
        } else {
          res.sendStatus(404);
        }
      }).catch(err => {
        res.status(400).send(err);
      })
    }).catch(err => {
      res.status(400).send(err);
    })
  },

  signup: (req, res) => {
    User.findOrCreate({ where: {
      username: req.body.username
    }, defaults: {
      password: bcrypt.hashSync(req.body.password),
      status: false
    }}).then(user => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.sendStatus(201);
      }
    }).catch(err => {
      res.status(400).send(err);
    })
  }
};

module.exports = {
  AuthenticationController: AuthenticationController
};
