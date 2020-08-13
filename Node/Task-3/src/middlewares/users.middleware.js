const crypto = require('crypto');

function generatePassword(req, res, next) {

  const salt = crypto.randomBytes(10).toString('hex');
  const hash = crypto.createHmac('sha256', salt)
    .update(req.body.password)
    .digest('hex');

  req.body.passwordSalt = salt;
  req.body.passwordHash = hash;

  next();
}

module.exports = {
  generatePassword
}
