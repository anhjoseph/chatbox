const { User } = require('../../db/models');
const { authenticate } = require('../utils/authenticate');

const UserController = {
  GET: (req, res) => {
    if (authenticate.verify(req.token)) {
      User.findAll({
        where: { status: true }
      }).then(data => {
        let users = [...data].map((user) => {
          return { username: user.dataValues.username };
        });
        res.status(200).send(users);
      }).catch(err => {
        res.status(404).send(err);
      })
    } else {
      res.sendStatus(403);
    }
  }
}

module.exports = {
  UserController: UserController
};
