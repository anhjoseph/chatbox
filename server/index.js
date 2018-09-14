require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const parser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);

const { router } = require('./router');
const { UserController } = require('./controllers/users');
const { ChannelController } = require('./controllers/channels');
const { MessageController } = require('./controllers/messages');

require('../db/config');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', router);

server.listen(port, () => {
  io.on('connection', socket => {
    let username;
    let channel = 'default';
    socket.join(channel);

    socket.on('user connected', user => {
      username = user;
      UserController.connect(
        io,
        user,
      );
    });

    socket.on('user disconnected', user => {
      socket.leave(socket.channel);
      UserController.disconnect(socket, user);
    });

    socket.on('disconnect', () => {
      UserController.disconnect(socket, username);
    });

    socket.on('channel', channelname =>
      ChannelController.save(io, channelname),
    );

    socket.on('message', msg => MessageController.save(io, msg));

    socket.on('join', channelname => {
      socket.leave(socket.channel);
      channel = channelname;
      socket.join(channel);
    });
  });
});
