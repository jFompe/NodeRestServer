const { Router } = require("express")
const { check } = require('express-validator')

const {
  login,
} = require('../controllers/auth')
const { validateFields } = require("../middlewares/validation")



const router = Router()


router.post('/login', [
  check('mail', 'Email is not valid').isEmail(),
  check('password', 'Password is mandatory').not().isEmpty(),
  validateFields
], login)



module.exports = router