const express = require('express');
const http = require('http');
const path = require('path');
const parser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const Login = require('../client/components/Login.jsx');
// const session = require('express-session');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err); 
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use(passport.initialize());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')))

server.listen(port, () => {
  console.log(`server running at ${port}`);

  io.on('connection', (socket) => {

    socket.on('send', (msg) => {
      io.emit('send', msg);
    });

  });
});

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));
