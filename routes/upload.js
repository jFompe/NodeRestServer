const { Router } = require("express")
const { check } = require('express-validator')

const { uploadFile, updateImage, showImage } = require('../controllers/upload')
const { validateCollection } = require("../helpers/db-validators")
const { validateFileUpload, validateFields } = require("../middlewares")



const router = Router()

router.get('/:collection/:id', [
  
], showImage)

router.post('/', [
  validateFileUpload,
], uploadFile)

router.put('/:collection/:id', [
  validateFileUpload,
  check('id', 'Not a valid Mongo Id').isMongoId(),
  check('collection').custom(c => validateCollection(c, ['user', 'product'])),
  validateFields,
], updateImage)



module.exports = router