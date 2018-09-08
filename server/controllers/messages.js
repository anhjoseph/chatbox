const { Message } = require('../../db/models');
const { authenticate } = require('../utils/authenticate');

const MessageController = {
  GET: (req, res) => {
    if (authenticate.verify(req.token)) {
      Message.findAll({
      
      }).then(data => {
        let messages = [...data].map((message) => {
          return {
            username: message.dataValues.username,
            text: message.dataValues.text,
            timestamp: message.dataValues.timestamp
          };
        });
        res.status(200).send(messages);
      }).catch(err => {
        res.status(404).send(err);
      })
    } else {
      res.sendStatus(403);
    }
  },

  save: (io, msg) => {
    // verify token for socket
    Message.create({
      username: msg.username,
      text: msg.text,
      timestamp: msg.timestamp
    }).then(() => {
      io.emit('message', msg)
    });
  }
};

module.exports = {
  MessageController: MessageController
};
