const path = require('path')
const { v4: uuidv4 } = require('uuid')


const loadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], dir = '') => {

  return new Promise((resolve, reject) => {

    const { file } = files
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]

    if (!validExtensions.includes(extension)) {
      reject(`Extension ${extension} is not one of ${validExtensions}`)
    }

    const tmpName = uuidv4() + '.' + extension
    const uploadPath = path.join(__dirname, '../uploads/', dir, tmpName)

    file.mv(uploadPath, err => {
      if (err) {
        reject(err)
      }

      resolve(uploadPath)
    })
  })
}




module.exports = {
  loadFile
}