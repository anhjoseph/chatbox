const { Channel } = require('../../db/models');

const ChannelController = {
  GET: (req, res) => {
    Channel.findAll({

    }).then(data => {
      let channels = [...data].map((channel) => {
        return { channel: channel.dataValues.channelname }
      });
      res.status(200).send(channels);
    }).catch(err => {
      console.log('error fetching channels', err);
    })
  },

  POST: (channel) => {
    console.log(channel);
    Channel.create({ channelname: channel.channel })
      .then(() => {
        console.log('successfully created channel');
      }).catch(err => {
        console.log('error creating channel', err);
      })
  }
};

module.exports = {
  ChannelController: ChannelController
};