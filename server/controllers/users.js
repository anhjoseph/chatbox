const { User } = require('../../db/models');
const { authenticate } = require('../utils/authenticate');

const UserController = {
  GET: (req, res) => {
    if (authenticate.verify(req.token)) {
      User.findAll({
        where: { status: true }
      }).then(data => {
        let users = [...data].map(user => {
          return user.dataValues.username
        });
        res.status(200).send(users);
      }).catch(err => {
        res.status(404).send(err);
      })
    } else {
      res.sendStatus(403);
    }
  },

  connect: (io, username) => {
    User.findOne({ where: {
      username: username
    }}).then(user => {
      if (user) {
        user.update({ status: true }).then(() => {
          io.emit('user connected', username);
        })
      }
    })
  },

  disconnect: (socket, username) => {
    User.findOne({ where: {
      username: username
    }}).then(user => {
      if (user) {
        user.update({ status: false }).then(() => {
          socket.broadcast.emit('user disconnected', username);
        })
      }
    }).catch(err => {})
  }
};

module.exports = {
  UserController: UserController
};
