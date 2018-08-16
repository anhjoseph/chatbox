const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../db/models');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where: { username: username } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      }).catch(err => {
        return done(err);
      })
  }
));

const Authenticate = {
  Login: () => {
    passport.authenticate('local', (req, res) => {
      res.status(201).send(req.user.username);
    });
  },

  Signup: (req, res) => {
    User.findOrCreate({ where: { username: req.body.username }})
      .then(() => {
        res.status(201).send('successfully signed up');
      }).catch(err => {
        console.log('error signing up', err);
      })
  }
};

module.exports = {
  Authenticate: Authenticate
};
