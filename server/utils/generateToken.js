const jwt = require('jsonwebtoken');

const generateToken = (username) => {
  let payload = {
    username: username
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  });
};

module.exports = {
  generateToken: generateToken
};