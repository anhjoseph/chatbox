const { Message } = require('../../db/models');

const MessageController = {
  GET: (req, res) => {
    Message.findAll({
      
    }).then(data => {
      let messages = [...data].map((message) => {
        return {
          text: message.dataValues.text,
          timestamp: message.dataValues.timestamp
        };
      });
      res.status(200).send(messages);
    }).catch(err => {
      console.log('error fetching messages', err);
    })
  },

  POST: (msg) => {
    Message.create({ text: msg.text, timestamp: msg.timestamp })
      .then(() => {
        console.log('successfully posted message');
      }).catch(err => {
        console.log('error posting message', err);
      })
  }
};

module.exports = {
  MessageController: MessageController
};
