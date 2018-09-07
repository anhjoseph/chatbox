const express = require('express');
const http = require('http');
const path = require('path');
const parser = require('body-parser');

const { router } = require('./router');
const { ChannelController } = require('./controllers/channels');
const { MessageController } = require('./controllers/messages');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);

require('dotenv').config();
require('../db/config');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', router);

server.listen(port, () => {
  console.log(`server running at ${port}`);

  io.on('connection', (socket) => {

    socket.on('user connected', (user) => {
      socket.broadcast.emit('user connected', user);
    });

    socket.on('user disconnected', (user) => {
      socket.broadcast.emit('user disconnected', user);
    });

    socket.on('channel', (channel) => {
      ChannelController.POST(channel, io);
    });

    socket.on('message', (msg) => {
      io.emit('message', msg);
      MessageController.POST(msg);
    });
    
  });
});
