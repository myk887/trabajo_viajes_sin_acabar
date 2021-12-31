const router = require('express').Router()
const {loginValidatorMiddleware} = require('./..//middlewares/loginValidatorMiddleware')
const { postUserController } = require('./../controllers/users')

router.post('/', postUserController)

router.get('/validate/:registrationCode', async (req, res) => {
  const code = req.params.registrationCode

  let result
  try {
      result = await usersRepository.getValidate(code)
  } catch (error) {
      res.status(500)
      res.end(error.message)
      return
  }
  if (!result) {
      res.status(404)
      res.end('invalid registration code')
      return
  }
  res.status(200)
  res.send('ok')
})

router.post('/login', loginValidatorMiddleware, async (req, res) => {
  const user = req.body

  let newUser
  try {
      newUser = await usersRepository.postLogin(user)
  } catch (error) {
      res.status(501)
      res.end(error.message)
      return
  }
  if (!newUser) {
      res.status(404)
      res.end('ERROR, verify email')
      return
  }
  if (!newUser.active) {
      res.status(404)
      res.end('ERROR, not verify email')
      return
  }

  if (!await bcrypt.compare(user.password, newUser.password)) {
      res.status(403)
      res.end('Invalid password')
      return
  }

  const token = jwt.sign({
      user: { id: newUser.id }
    }, JWT_PRIVATE_KEY);

    res.status(200)
    res.send({ token })
})


router.get('/', async (req, res) => {
  const users = await usersRepository.getUsers()
  if (!users) {
      res.status(404)
      res.end('Users not found')
      return
  }
  res.status(200)
  res.send(users)
})

router.get('/:idEntry', async (req, res) => {
  const user = await usersRepository.getUserById(req.params.idEntry)
  if (!user) {
      res.status(404)
      res.end('Users not found')
      return
  }
  res.status(200)
  res.send(user)
})

module.exports = router