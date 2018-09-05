const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  let payload = {
    username: user.username
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  });
};

module.exports = {
  generateToken: generateToken
};