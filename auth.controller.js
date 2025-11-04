const md5 = require('md5')
const jwt = require('jsonwebtoken')

const userModel = require('../models/index').user
const secret = 'mokleters'

// LOGIN
const authenticate = async (req, res) => {
  try {
    const dataLogin = {
      username: req.body.username,
      password: md5(req.body.password)
    }

    const dataUser = await userModel.findOne({ where: dataLogin })

    if (!dataUser) {
      return res.json({
        success: false,
        logged: false,
        message: 'authentication failed. invalid username or password'
      })
    }

    const payload = {
      userID: dataUser.userID,
      role: dataUser.role,
      email: dataUser.email
    }

    const token = jwt.sign(payload, secret)

    return res.json({
      success: true,
      logged: true,
      message: 'authentication success',
      token: token,
      data: dataUser
    })
  } catch (err) {
    return res.json({
      success: false,
      logged: false,
      message: err.message
    })
  }
}

// AUTHORIZATION
const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      auth: false,
      message: 'no token provided'
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const verifiedUser = jwt.verify(token, secret)

    // 🪄 this line makes your role checks work
    req.user = verifiedUser

    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      auth: false,
      message: 'invalid or expired token'
    })
  }
}

module.exports = { authenticate, authorize }
