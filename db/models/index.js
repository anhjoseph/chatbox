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

const Channel = db.define('Room', {
  channelname: {
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

Channel.hasMany(Message, { foreignKey: 'channel_id' });
User.hasMany(Message, { foreignKey: 'user_id' });

Channel.belongsToMany(User, { through: 'Subscription', foreignKey: 'channel_id' });
User.belongsToMany(Channel, { through: 'Subscription', foreignKey: 'user_id' });

db.sync({ force: true })
  .then(() => console.log('successfully connected to db'))
  .catch(err => console.log('error syncing to database', err))

module.exports = {
  User: User,
  Channel: Channel,
  Message: Message
};
