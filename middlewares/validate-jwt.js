const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')


const validateJWT = async (req = request, res = response, next) => {

  const token = req.header('X-Token')
  if (!token) {
    return res.status(401).json({
      msg: 'Missing token'
    })
  }

  try {
    
    const { uid } = jwt.verify(token, process.env.JWT_KEY)

    const authUser = await User.findById(uid)

    if (!authUser) {
      return res.status(400).json({
        msg: 'Usuario incorrecto'
      })
    }

    req.user = authUser

  } catch (error) {
    console.log(error)
    return res.status(401).json({
      msg: 'Invalid token'
    })
  }

  next()
}


module.exports = {
  validateJWT
}