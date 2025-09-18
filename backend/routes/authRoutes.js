const express = require('express')
const {register, login, logout} = require('../controllers/authController.js')

const router = express.Router()

//posts because the username and password are required
router.post('/login', login)
router.post('/register', register)

//get bcuz just reading the token back
router.get('/logout', logout)

module.exports = router