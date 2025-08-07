const express = require('express')
const router = express.Router()
const {signupUser} = require('../Controllers/authControllers.js')
const {loginUser} = require('../Controllers/authControllers.js')

router.post('/signup',signupUser)
router.post('/login',loginUser)

module.exports = router