const express = require('express')
const router = express.Router()
const {signupUser} = require('../Controllers/authControllers.js')

router.post('/signup',signupUser)

module.exports = router