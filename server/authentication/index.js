const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

const Authenticate = {
  POST: (req, res) => {
    passport.authenticate('local', (req, res) => {
      res.status(201).send(req.user.username);
    });
  }
}

module.exports = {
  Authenticate: Authenticate
};