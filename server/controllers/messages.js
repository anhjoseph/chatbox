const { Message } = require('../../db/models');

const MessagesController = {
  POST: (msg) => {
    Message.create({ message: msg })
      .then(() => {
        console.log('successfully posted message');
      }).catch(err => {
        console.log('error posting message', err);
      })
  },

  GET: (req, res) => {
    Message.findAll({
      
    }).then(messages => {
      console.log('messages === ', messages);
      res.status(200).send(messages);
    }).catch(err => {
      console.log('error fetching messages', err);
    })
  }
};

module.exports = {
  MessagesController: MessagesController
};