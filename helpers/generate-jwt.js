const jwt = require('jsonwebtoken')



const generateJWT = async (uid = '') => {
  return new Promise((res, rej) => {
    const payload = { uid }

    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        rej('JWT not generated')
      }
      res(token)
    })

  })
}



module.exports = {
  generateJWT
}