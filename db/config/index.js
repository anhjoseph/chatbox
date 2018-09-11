const Sequelize = require('sequelize');

const db = new Sequelize('chatroom', 'postgres', '', {
  host: 'db',
  dialect: 'postgres'
});

db.authenticate()
  .then(() => console.log('db authenticated'))
  .catch(err => console.log('error authenticating db', err))

module.exports = {
  db: db
};
