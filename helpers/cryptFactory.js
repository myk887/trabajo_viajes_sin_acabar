const crypto = require('crypto')
const bcrypt = require('bcrypt')

const generateRegistrationCode = () => {
  return crypto.randomBytes(40).toString('hex')
}

const cryptPassword = async (password) => {
  return await bcrypt.hash(password, Number(process.env.BCRYPT_SALT))
}

module.exports = {
  generateRegistrationCode,
  cryptPassword
}