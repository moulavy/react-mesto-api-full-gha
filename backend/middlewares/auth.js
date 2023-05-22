require('dotenv').config();
const jwt = require('jsonwebtoken');
//const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {

  const token= req.cookies.token;

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация.'));
   }
  let payload;
  try {
  //  payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'tg555000');
    payload = jwt.verify(token, 'tg555000');
  } catch (e) {
   next(new UnauthorizedError('Необходима авторизация.'));
  }
  req.user = payload;

return next()
};
