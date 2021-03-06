const { Channel, Message } = require('../../db/models');
const { authenticate } = require('../utils/authenticate');

const MessageController = {
  GET: (req, res) => {
    if (authenticate.verify(req.token)) {
      Message.findAll({
        include: [
          {
            model: Channel,
            where: {
              channelname: req.query.channel,
            },
          },
        ],
      })
        .then(data => {
          const messages = [...data].map(message => ({
            id: message.dataValues.id,
            username: message.dataValues.username,
            text: message.dataValues.text,
            timestamp: message.dataValues.timestamp,
          }));
          res.status(200).send(messages);
        })
        .catch(err => {
          res.status(404).send(err);
        });
    } else {
      res.sendStatus(403);
    }
  },

  save: (io, msg) => {
    Channel.find({
      where: { channelname: msg.channel },
    }).then(channel => {
      if (channel) {
        Message.create({
          channel_id: channel.id,
          username: msg.username,
          text: msg.text,
          timestamp: msg.timestamp,
        }).then(message => {
          io.in(msg.channel).emit('message', {
            id: message.id,
            username: msg.username,
            text: msg.text,
            timestamp: msg.timestamp,
          });
        });
      } else {
        Message.create(
          {
            username: msg.username,
            text: msg.text,
            timestamp: msg.timestamp,
            Channel: {
              channelname: msg.channel,
            },
          },
          { include: [{ model: Channel }] },
        ).then(message => {
          io.in(msg.channel).emit('message', {
            id: message.id,
            username: msg.username,
            text: msg.text,
            timestamp: msg.timestamp,
          });
        });
      }
    });
  },
};

module.exports = {
  MessageController,
};
