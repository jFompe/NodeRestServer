const bcryptjs = require('bcryptjs')
const { response, request } = require('express')
const User = require('../models/user')


const usuariosGet = async (req = request, res = response) => {

  const { limit = 5, from = 0 } = req.query
  const notDeleted = { isDeleted: false }

  const [total, users] = await Promise.all([
    User.countDocuments(notDeleted),
    User.find(notDeleted)
      .skip(parseInt(from))
      .limit(parseInt(limit)),
  ])

  res.json({
    total,
    users,
  })
}

const usuariosPost = async (req, res = response) => {

  const { name, mail, password, role } = req.body
  const user = new User({ name, mail, password, role })

  // Encrypt password
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  // Save in DB
  await user.save()

  res.json({
    message: 'post API - controller',
    user
  })
}

const usuariosPut = async (req, res = response) => {

  const { id } = req.params
  const { _id, mail, password, isGoogleUser, ...rest } = req.body

  // TODO Validate

  if (password) {
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const userDB = await User.findByIdAndUpdate( id, rest )

  res.json({
    message: 'put API - controller',
    userDB
  })
}

const usuariosDelete = async (req, res = response) => {

  const { id } = req.params

  const user = await User.findByIdAndUpdate(id, { isDeleted: true })
  const authUser = req.user

  res.json({
    user,
    authUser
  })
}


module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
}