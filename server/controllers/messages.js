const { Message } = require('../../db/models');

const MessageController = {
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
      
    }).then(data => {
      let messages = [...data].map((message) => {
        return message.dataValues.message;
      });
      res.status(200).send(messages);
    }).catch(err => {
      console.log('error fetching messages', err);
    })
  }
};

module.exports = {
  MessageController: MessageController
};
