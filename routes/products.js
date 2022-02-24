const { Router } = require("express")
const { check } = require('express-validator')
const { 
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/product")
const { productExists, categoryExists } = require("../helpers/db-validators")

const { validateFields } = require("../middlewares/validation")
const { validateJWT, isAdminRole } = require('../middlewares')



const router = Router()


router.get('/', [

], getProducts)

router.get('/:id', [
  check('id', 'Not a valid Mongo Id').isMongoId(),
  check('id').custom(productExists),
  validateFields,
], getProduct)

router.post('/', [
  validateJWT,
  check('name', 'Name is mandatory').not().isEmpty(),
  check('category', 'Not a valid Mongo Id').isMongoId(),
  check('category').custom(categoryExists),
  validateFields,
], createProduct)

router.put('/:id', [
  validateJWT,
  check('category', 'Not a valid Mongo Id').isMongoId(),
  check('id').custom(productExists),
  validateFields,
], updateProduct)

router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('category', 'Not a valid Mongo Id').isMongoId(),
  check('id').custom(productExists),
  validateFields,
], deleteProduct)


module.exports = router