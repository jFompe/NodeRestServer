const { Router } = require("express")
const { check } = require('express-validator')
const {
  isRoleValid,
  mailExists,
  userExistsById,
} = require('../helpers/db-validators')

const { 
  usuariosGet, 
  usuariosPost, 
  usuariosPut, 
  usuariosDelete 
} = require("../controllers/user")

const {
  validateFields,
  validateJWT,
  hasRole,
} = require('../middlewares')

const router = Router()


router.get('/', usuariosGet)

router.post('/', [
  check('name', 'Name is not valid').not().isEmpty(),
  check('password', 'Password is not valid').isLength({ min: 6 }),
  check('mail', 'Mail is not valid').isEmail(),
  check('mail').custom(mailExists),
  check('role').custom(isRoleValid),
  validateFields
],usuariosPost)

router.put('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(userExistsById),
], usuariosPut)

router.delete('/:id', [
  validateJWT,
  hasRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(userExistsById),
  validateFields,
], usuariosDelete)

module.exports = router


