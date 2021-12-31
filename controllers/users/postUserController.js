const postUserController = async (req, res) => {
  const user = req.body

  try {
      await usersShema.validateAsync(user)
  } catch (error) {
       res.status(404)
       res.end(error.message)
       return
  }
  const codeRegistration = generateRegistrationCode()
  let newUser
  try {
      newUser = await usersRepository.postUsers({
          ...user,
          registrationCode: codeRegistration,
          password: await cryptPassword(user.password)
      })
  } catch (error) {
      res.status(500)
      res.end(error.message)
      return
  }

  if (!newUser || !user) {
      res.status(404)
      res.end('Users not found')
      return
  }

  accountConfirmationEmail({ sendTo: newUser.email, code: codeRegistration})

  res.status(200)
  res.send(newUser)
}

module.exports = postUserController