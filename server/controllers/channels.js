const { Channel } = require('../../db/models');

const ChannelController = {
  GET: (req, res) => {
    Channel.findAll({

    }).then(data => {
      let channels = [...data].map((channel) => {
        return channel.dataValues.channelname;
      });
      res.status(200).send(channels);
    }).catch(err => {
      console.log('error fetching channels', err);
    })
  }
}

module.exports = {
  ChannelController: ChannelController
}