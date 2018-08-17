const express = require('express');
const http = require('http');
const path = require('path');
const parser = require('body-parser');
// const passport = require('passport');
// const session = require('express-session');
const { router } = require('./router');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);

require('../db/config');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
// app.use(session({  }))
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/', router);

server.listen(port, () => {
  console.log(`server running at ${port}`);

  io.on('connection', (socket) => {
    socket.on('send', (msg) => {
      io.emit('send', msg);
    });
  });
});
