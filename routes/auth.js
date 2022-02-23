const { Router } = require("express")
const { check } = require('express-validator')

const {
  login, googleSignIn,
} = require('../controllers/auth')
const { validateFields } = require("../middlewares/validation")



const router = Router()


router.post('/login', [
  check('mail', 'Email is not valid').isEmail(),
  check('password', 'Password is mandatory').not().isEmpty(),
  validateFields
], login)

router.post('/google', [
  check('id_token', 'Google Token is mandatory').not().isEmpty(),
  validateFields
], googleSignIn)


module.exports = router