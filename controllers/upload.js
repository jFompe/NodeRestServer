const path = require('path')
const fs = require('fs')

const { request, response } = require("express")
const { loadFile } = require("../helpers/upload-file")
const { User, Product } = require("../models")



const uploadFile = async (req = request, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      msg: 'No files were uploaded'
    })
  }

  const { filePath } = await loadFile(req.files).catch(err => {
    res.status(400).json({ msg: err })
  })

  res.json({ filePath })
}

const updateImage = async (req = request, res = response) => {

  const { id, collection } = req.params

  let model

  switch (collection) {
    case 'user':
      model = await User.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `No user with id ${id}`
        })
      }
      break
    case 'product':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `No product with id ${id}`
        })
      }
      break
    default:
      return res.status(400).json({ msg: `Collection ${collection} not configured` })
  }

  // Clean former images
  try {
    if (model.img) {
      // Remove img from server
      const imagePath = path.join(__dirname, '../uploads', collection, model.img)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({ msg: err })
  }

  model.img = await loadFile(req.files, undefined, collection).catch(err => {
    res.status(400).json({ msg: err })
  })
  await model.save()

  res.json({ model })
}

const showImage = async (req, res) => {
  const { id, collection } = req.params

  let model

  switch(collection) {
    case 'user':
      model = await User.findById(id)
      break
    case 'product':
      model = await Product.findById(id)
      break

  }

  if (model.img && fs.existsSync(model.img)) {
    return res.sendFile(model.img)
  }

  const defaultImgPath = path.join(__dirname, '../assets', 'no-image.jpg') 
  res.sendFile(defaultImgPath)
}

module.exports = {
  uploadFile,
  updateImage,
  showImage,
}