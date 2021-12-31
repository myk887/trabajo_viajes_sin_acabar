const loginShema = require('./../shemas/loginUsers')

const loginValidatorMiddleware = async (req, res, next) => {
  const user = req.body
  try {
     await loginShema.validateAsync(user)
  } catch (error) {
      res.status(404)
      res.end(error.message)
      return
  }
  next()
}

module.exports = {
  loginValidatorMiddleware
}