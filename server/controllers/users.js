const { User } = require('../../db/models');

const UserController = {
  GET: (req, res) => {
    User.findAll({

    }).then(data => {
      let users = [...data].map((user) => {
        return user.dataValues.username;
      });
      res.status(200).send(users);
    }).catch(err => {
      console.log('error fetching users', err);
    })
  }
}

module.exports = {
  UserController: UserController
};
