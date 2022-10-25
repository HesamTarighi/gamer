const jwt_decode = require('jwt-decode');

const Decode = (req) => {
  return jwt_decode(req.headers.authorization).user;
}

module.exports = {Decode}
