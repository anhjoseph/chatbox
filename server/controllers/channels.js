const { Channel } = require('../../db/models');
const { authenticate } = require('../utils/authenticate');

const ChannelController = {
  GET: (req, res) => {
    if (authenticate.verify(req.token)) {
      Channel.findAll({

      }).then(data => {
        let channels = [...data].map((channel) => {
          return { channel: channel.dataValues.channelname }
        });
        res.status(200).send(channels);
      }).catch(err => {
        res.status(404).send(err);
      })
    } else {
      res.sendStatus(403);
    }
  },

  save: (io, channel) => {
    // verify token for socket
    Channel.findOrCreate({ where: {
      channelname: channel.channel
    }}).spread((instance, created) => {
      if (created) {
        io.emit('channel', channel);
      }
    })
  }
};

module.exports = {
  ChannelController: ChannelController
};
