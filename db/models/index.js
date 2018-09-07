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
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
  timestamps: false
});

const Channel = db.define('Channel', {
  channelname: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

const Message = db.define('Message', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },

  text: {
    type: Sequelize.STRING,
    allowNull: false
  },

  timestamp: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

// Channel.hasMany(Message, { foreignKey: 'channel_id' });
// User.hasMany(Message, { foreignKey: 'user_id' });

// Channel.belongsToMany(User, { through: 'Subscription', foreignKey: 'channel_id', timestamps: false });
// User.belongsToMany(Channel, { through: 'Subscription', foreignKey: 'user_id', timestamps: false });

db.sync({ force: false })
  .then(() => console.log('successfully connected to db'))
  .catch(err => console.log('error syncing to database', err))

module.exports = {
  User: User,
  Channel: Channel,
  Message: Message
};
