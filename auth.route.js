const express = require('express')

const app = express.Router()

const {authenticate} = require('../controllers/auth.controller')

app.post('/login', authenticate)

module.exports = app