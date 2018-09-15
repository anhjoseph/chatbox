const bcrypt = require('bcrypt-nodejs');
const { User } = require('../../db/models');
const { authenticate } = require('../utils/authenticate');

const AuthenticationController = {
  login: (req, res) => {
    User.findOne({
      where: { username: req.body.username },
    })
      .then(user => {
        if (bcrypt.compareSync(req.body.password, user.dataValues.password)) {
          user.update({ status: true }).then(updatedUser => {
            const token = authenticate.generateToken(updatedUser.username);
            res.status(200).send({ token });
          });
        } else {
          res.sendStatus(404);
        }
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  signup: (req, res) => {
    User.findOne({
      where: { username: req.body.username },
    })
      .then(user => {
        if (user) {
          res.status(200).send('That username is taken. Try another.');
        } else {
          User.create({
            where: { username: req.body.username },
            defaults: {
              password: bcrypt.hashSync(req.body.password),
              status: false,
            },
          })
            .then(() => {
              res.status(201).send();
            })
            .catch(err => {
              res.status(400).send(err);
            });
        }
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
};

module.exports = {
  AuthenticationController,
};
