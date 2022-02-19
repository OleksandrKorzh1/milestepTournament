const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../../config');
const statusCode=require('../../statusCode');

// eslint-disable-next-line consistent-return
const authenticateToken = (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.cookies.AuthToken;
  if (authHeader === null) return res.sendStatus(401);

  // eslint-disable-next-line consistent-return
  jwt.verify(authHeader, accessTokenSecret, (err, user) => {
    if (err) {
      console.log(err.message || err);
      return res.sendStatus(statusCode.unauthorized);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
