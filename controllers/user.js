const { response, request } = require('express')



const usuariosGet = (req = request, res = response) => {

  const { q, name = 'no name' } = req.query

  res.json({
    message: 'get API - controller',
  })
}

const usuariosPost = (req, res = response) => {

  const body = req.body

  res.json({
    message: 'post API - controller',
    body
  })
}

const usuariosPut = (req, res = response) => {

  const id = req.params.id

  res.json({
    message: 'put API - controller',
    id
  })
}

const usuariosDelete = (req, res = response) => {
  res.json({
    message: 'delete API',
  })
}


module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
}