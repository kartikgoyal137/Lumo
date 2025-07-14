const bcrypt = require("bcrypt");
const saltRounds = 10;

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
}

module.exports = hashPassword;
