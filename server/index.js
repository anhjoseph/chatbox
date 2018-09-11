const express = require('express');
const http = require('http');
const path = require('path');
const parser = require('body-parser');

const { router } = require('./router');
const { UserController } = require('./controllers/users');
const { ChannelController } = require('./controllers/channels');
const { MessageController } = require('./controllers/messages');

const app = express();
const port = process.env.PORT || 3000;
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

    socket.join('default');
    socket.channel = 'default';

    socket.on('user connected', (user) => {
      socket.username = user;
      UserController.connect(io, user);
    });

    socket.on('user disconnected', (user) => {
      socket.leave(socket.channel);
      UserController.disconnect(socket, user)
    });

    socket.on('disconnect', () => {
      UserController.disconnect(socket, socket.username);
    });

    socket.on('channel', channel => ChannelController.save(io, channel));
    
    socket.on('message', msg => MessageController.save(io, msg));

    socket.on('join', channel => {
      socket.leave(socket.channel);
      socket.channel = channel;
      socket.join(channel);
    });

  });

});
