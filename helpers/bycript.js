const bcrypt = require('bcryptjs')

function hash(plaintext){
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(plaintext, salt)
  return hash
}

function compare(plaintext, hash){
  return bcrypt.compareSync(plaintext, hash);
}

module.exports = {
  hash, compare
}