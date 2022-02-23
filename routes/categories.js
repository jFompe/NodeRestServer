const { Router } = require("express")
const { check } = require('express-validator')

const { 
  getCategories,
  getCategory,
  createCategory,
  updateCategory, 
  deleteCategory 
} = require("../controllers/categories")
const { categoryExists } = require("../helpers/db-validators")

const { validateFields, validateJWT, isAdminRole } = require("../middlewares")

const router = Router()


router.get('/', [

], getCategories)

router.get('/:id', [
  check('id', 'Not a valid Mongo ID').isMongoId(),
  validateFields,
  check('id').custom(categoryExists),
], getCategory)

router.post('/', [
  validateJWT,
  check('name', 'Name is mandatory').not().isEmpty(),
], createCategory)

router.put('/:id', [
  validateJWT,
  check('name', 'Name is mandatory').not().isEmpty(),
  check('id').custom(categoryExists),
], updateCategory)

router.delete('/:id', [
  validateJWT,
  // isAdminRole,
  check('id', 'Not a valid Mongo ID').isMongoId(),
  check('id').custom(categoryExists),
  validateFields,
], deleteCategory)


module.exports = router