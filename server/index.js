const express = require('express');
const http = require('http');
const path = require('path');
const parser = require('body-parser');
// const session = require('express-session');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);
const { passport } = require('./authentication');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(passport.initialize());

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

server.listen(port, () => {
  console.log(`server running at ${port}`);

  io.on('connection', (socket) => {

    socket.on('send', (msg) => {
      io.emit('send', msg);
    });

  });
});

