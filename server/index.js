const express = require('express');
const http = require('http');
const path = require('path');
const parser = require('body-parser');
// const passport = require('passport');
// const session = require('express-session');
const { router } = require('./router');
const { MessageController } = require('./controllers/messages');

const app = express();
const port = 3000;
const server = http.createServer(app);
// initialize a new instance of socket.io by passing in http object
const io = require('socket.io')(server);

require('../db/config');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
// app.use(session({  }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/', router);

server.listen(port, () => {
  console.log(`server running at ${port}`);
  // listen on the (native) connection event for incoming sockets
  io.on('connection', (socket) => {

    socket.on('user', (username) => {
      io.emit('user', username);
    });

    socket.on('channel', (channel) => {
      io.emit('channel', channel);
    });

    socket.on('message', (msg) => {
      MessageController.POST(msg);
      io.emit('message', msg);
    });

  });
});
