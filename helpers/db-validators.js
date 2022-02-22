const Role = require('../models/role')
const User = require('../models/user')


const isRoleValid = async (role = '') => {
  const roleExists = await Role.findOne({ role })
  if (!roleExists) {
    throw new Error(`Role ${role} is not defined`)
  }
}

const mailExists = async (mail = '') => {
  const mailExists = await User.findOne({ mail, isDeleted: false })
  if (mailExists) {
    throw new Error(`Mail ${mail} already in use`)
  }
}

const userExistsById = async (id = '') => {
  const userExists = await User.findById(id)
  if (!userExists) {
    throw new Error(`User with id=${id} does not exist`)
  }
}


module.exports = {
  isRoleValid,
  mailExists,
  userExistsById,
}