const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/generate-jwt')

const login = async (req = request, res = response) => {

  const { mail, password } = req.body

  const user = await User.findOne({ mail })
  console.log(user.password);
  if (!user) {
    return res.status(400).json({
      msg: 'User / Password not correct  -user'
    })
  }

  try {
    
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / Password not correct'
      })
    }

    // Generare JWT
    const token = await generateJWT( user.id )

    res.json({
      msg: 'Login OK',
      user,
      token
    })

  } catch (error) {
    
    console.log(error);
    return res.status(400).json({
      msg: 'Contact the admin'
    })

  }
}



module.exports = {
  login
}