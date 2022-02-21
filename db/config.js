const mongoose = require('mongoose')



const dbConnection = async () => {

  try {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Base de datos Online')

  } catch (err) {
    console.log(err)
    throw new Error('Error en la BD')
  }



}



module.exports = {
  dbConnection
}