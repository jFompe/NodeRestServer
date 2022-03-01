const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config')
const fileUpload = require('express-fileupload')


class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.paths = {
      'auth': '/api/auth',
      'categories': '/api/categories',
      'user': '/api/usuarios',
      'products': '/api/products',
      'search': '/api/search',
      'upload': '/api/upload',
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

    // File Upload
    this.app.use(fileUpload({
      createParentPath: true,
      useTempFiles: true,
      tempFileDir: '/tmp/'
    }))
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