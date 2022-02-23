const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/generate-jwt')
const { googleVerify } = require('../helpers/google-verify')

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


const googleSignIn = async (req, res = response) => {

  const { id_token } = req.body

  try {
    
    const { name, mail, img } = await googleVerify(id_token)

    let user = await User.findOne({ mail })
    
    if (!user) {
      //Create user
      const data = {
        name,
        mail,
        password: '1234',
        img,
        role: 'USER_ROLE',
        isGoogleUser: true
      }
      user = new User(data)
      await user.save()
    }

    if (user.isDeleted) {
      return res.status(401).json({
        msg: 'User is blocked'
      })
    }

    // Generate JWT
    const token = await generateJWT(user.id)

    res.json({
      msg: 'Alrait',
      user,
      token
    })
    
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Google Token could not be verified'
    })
  }
}


module.exports = {
  login,
  googleSignIn
}