const jwt = require('jsonwebtoken');

const authenticate = {
  generateToken: username => {
    const payload = { username };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
  },

  verifyToken: (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  },

  verify: token => jwt.verify(token, process.env.JWT_SECRET),
};

module.exports = {
  authenticate,
};
