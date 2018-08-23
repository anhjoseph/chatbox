const Sequelize = require('sequelize');
const { db } = require('../config');

const User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  status: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Room = db.define('Room', {
  roomname: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Message = db.define('Message', {
  message: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Room.hasMany(Message, { foreignKey: room_id });
User.hasMany(Message, { foreignKey: user_id });

Room.belongsToMany(User, { through: 'Subscriptions', foreignKey: room_id });
User.belongsToMany(Room, { through: 'Subscriptions', foreignKey: user_id });

db.sync({ force: false })
  .then(() => console.log('successfully connected to db'))
  .catch(err => console.log('error syncing to database', err))

module.exports = {
  User: User,
  Room: Room,
  Message: Message
};
