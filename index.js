require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const travelsRepository = require('./repositorio_entris/mysql-tavel')
const usersRepository = require('./repositorio-users/mysql-users')
const entryShema = require('./shemas/entris')
const usersShema = require('./shemas/users')
const loginShema = require('./shemas/loginUsers')
const { generateRegistrationCode, cryptPassword } = require('./helpers/cryptFactory')
const { accountConfirmationEmail } = require('./notificationEmail/emailSender')
const { loginValidatorMiddleware } = require('./middlewares')
const { userRoutes } = require('./routes')

const fileUpload = require('express-fileupload')


const {PORT, BASE_URL, JWT_PRIVATE_KEY} = process.env

const app = express()

app.use(fileUpload())

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.use('/users', userRoutes)

app.get('/entries', async (req, res) => {
    const {search, order, direction} = req.query
    let travels
    try {
        travels = await travelsRepository.getTravels({search, order, direction})
    } catch (error) {
    res.status(500)
    res.end(error.message)
    return
    }
    if (!travels.length) {
        res.status(404)
        res.end('Entris not found')
        return
    }
    res.status(200)
    res.send(travels)
})

app.get('/entries/:idEntry', async (req, res) => {
    entryId = req.params.idEntry
    let travel
    try {
        travel = await travelsRepository.getTravelsById(entryId)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!travel.length) {
        res.status(404)
        res.end('Entris not found')
        return
    }
    res.status(200)
    res.send(travel)
})

app.post('/entries', async (req, res) => {
    const travel = req.body
    try {
       await entryShema.validateAsync(travel)
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }
    let newTravel
    try {
        newTravel = await travelsRepository.postTravel(travel)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if (!newTravel || !travel) {
        res.status(404)
        res.end('Entris not found')
        return
    }
    res.status(200)
    res.send(true)
})


app.post('/uploads', (req, res) => {
    const avatar = req.files.avatar

    avatar.mv('./uploads/avatar.png')
    res.send('ok')
})



app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en ${BASE_URL}:${PORT}`)
})