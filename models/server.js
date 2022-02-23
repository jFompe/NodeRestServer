const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config')


class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.paths = {
      'auth': '/api/auth',
      'categories': '/api/categories',
      'user': '/api/usuarios',
      'products': '/api/products'
    }

    // Connect DB
    this.connectDB()

    // Middlewares
    this.middlewares()

    // App routes
    this.routes()
  }

  middlewares() {

    // CORS
    this.app.use(cors())

    this.app.use(express.json())

    // Public directory
    this.app.use(express.static('public'))
  }

  routes() {
    
    Object.keys(this.paths).forEach(k => {
      this.app.use(this.paths[k], require(`../routes/${k}`))
    })
    // this.app.use(this.authPath, require('../routes/auth'))
    // this.app.use(this.usuariosPath, require('../routes/user'))

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running in port:', this.port)
    })
  }

  async connectDB() {
    await dbConnection()
  }
}




module.exports = Server