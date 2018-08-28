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
  },

  POST: (req, res) => {
    Channel.findOrCreate({ where: {
      channelname: req.body.channelname 
    }}).then(channel => {
        res.status(201).send(channel);
      }).catch(err => {
        res.status(404).send(err);
      })
  }
};

module.exports = {
  ChannelController: ChannelController
};