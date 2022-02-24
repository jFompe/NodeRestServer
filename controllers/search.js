const { request, response } = require('express')
const { User, Category, Product } = require('../models')
const { ObjectId } = require('mongoose').Types


const AllowedCollections = [
  'products',
  'categories',
  'users',
  'roles',
]


const searchUsers = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term)

  if (isMongoId) {
    const user = await User.findById(term)
    return res.json({
      results: user ? [ user ] : []
    })
  }

  const regex = new RegExp(term, 'i')

  const users = await User.find({ 
    $or: [{ name: regex }, { mail: regex }],
    $and: [{ isDeleted: false }]
  })
  return res.json({
    results: users
  })
}

const searchCategories = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term)

  if (isMongoId) {
    const category = await Category.findById(term)
    return res.json({
      results: category ? [ category ] : []
    })
  }

  const regex = new RegExp(term, 'i')

  const categories = await Category.find({ 
    $and: [{ isDeleted: false },{ name: regex }]
  })
  return res.json({
    results: categories
  })
}

const searchProducts = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term)

  if (isMongoId) {
    const product = await Product.findById(term)
      .populate('category', 'name')
    return res.json({
      results: product ? [ product ] : []
    })
  }

  const regex = new RegExp(term, 'i')

  const products = await Product.find({ 
    $and: [{ isDeleted: false },{ name: regex }]
  }).populate('category', 'name')
  return res.json({
    results: products
  })
}




const search = async (req, res = response) => {

  const { collection, term } = req.params

  if (!AllowedCollections.includes(collection)) {
    return res.status(404).json({
      msg: 'Collection not found'
    })
  }

  switch (collection) {
    case 'users':
      searchUsers(term, res)
      break;
    case 'categories':
      searchCategories(term, res)
      break;
    case 'products':
      searchProducts(term, res)
      break;
      
    default:
      break;
  }

}




module.exports = {
  search
}