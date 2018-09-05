const bcrypt = require('bcrypt-nodejs');
const { User } = require('../../db/models');

const Authenticate = {
  login: (req, res) => {
    User.findOne({ where: {
      username: req.body.username
    }}).then(user => {
      // req.session.user = user.dataValues.username;
      user.update({ status: true }).then(updatedUser => {
        if (bcrypt.compareSync(req.body.password, updatedUser.dataValues.password)) {
          res.status(200).send(updatedUser.dataValues.username);
        } else {
          res.status(404).send();
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
        res.status(201).send();
      }
    }).catch(err => {
      res.status(400).send(err);
    })
  }
};

module.exports = {
  Authenticate: Authenticate
};
