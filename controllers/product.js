const { response, request } = require("express")
const { Product } = require("../models")



const getProducts = async (req = request, res = response) => {

  const { limit = 5, from = 0 } = req.query
  const notDeleted = { isDeleted: false }

  const [total, products] = await Promise.all([
    Product.countDocuments(notDeleted),
    Product.find(notDeleted)
      .skip(parseInt(from))
      .limit(parseInt(limit))
      .populate('user', 'name')
      .populate('category', 'name')
  ])

  res.json({
    total,
    products,
  })
}

const getProduct = async (req, res = response) => {
  
  const { id } = req.params
  const product = await Product.findById(id).populate('user', 'name')

  res.json({
    msg: 'get1',
    product
  })
}

const createProduct = async (req, res = response) => {
  
  const name = req.body.name.toUpperCase()

  const productDB = await Product.findOne({ name })
  if (productDB) {
    return res.status(400).json({
      msg: `Product ${ productDB.name } already exists`
    })
  } 

  const data = {
    name,
    category: req.body.category,
    user: req.user._id
  }

  const product = await new Product(data)
  await product.save()

  res.status(201).json({
    msg: 'created',
    product
  })
}

const updateProduct = async (req, res = response) => {

  const { id } = req.params
  const { isDeleted, user, ...data } = req.body

  data.name = data.name.toUpperCase()
  data.user = req.user._id

  const product = await Product.findByIdAndUpdate(id, data, { new: true })

  res.json(product)  
}

const deleteProduct = async (req, res = response) => {
  
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

  res.json(product)  
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}