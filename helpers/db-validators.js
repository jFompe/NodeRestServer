const {
  Role,
  User,
  Category,
  Product,
} = require('../models')


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

const categoryExists = async (id = '') => {
  const categoryExists = await Category.findById(id)
  if (!categoryExists) {
    throw new Error(`No category with id ${id}`)
  }
}

const productExists = async (id = '') => {
  const productExists = await Product.findById(id)
  if (!productExists) {
    throw new Error(`No product with id ${id}`)
  }
}


module.exports = {
  isRoleValid,
  mailExists,
  userExistsById,
  categoryExists,
  productExists,
}