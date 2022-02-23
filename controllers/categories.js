const { response, request } = require("express")
const { Category } = require("../models")



const getCategories = async (req = request, res = response) => {

  const { limit = 5, from = 0 } = req.query
  const notDeleted = { isDeleted: false }

  const [total, categories] = await Promise.all([
    Category.countDocuments(notDeleted),
    Category.find(notDeleted)
      .skip(parseInt(from))
      .limit(parseInt(limit))
      .populate('user', 'name')
  ])

  res.json({
    total,
    categories,
  })
}

const getCategory = async (req, res = response) => {
  
  const { id } = req.params
  const category = await Category.findById(id).populate('user', 'name')

  res.json({
    msg: 'get1',
    category
  })
}

const createCategory = async (req, res = response) => {
  
  const name = req.body.name.toUpperCase()

  const categoryDB = await Category.findOne({ name })
  if (categoryDB) {
    return res.status(400).json({
      msg: `Category ${ categoryDB.name } already exists`
    })
  } 

  const data = {
    name,
    user: req.user._id
  }

  const category = await new Category(data)
  await category.save()

  res.status(201).json({
    msg: 'created',
    category
  })
}

const updateCategory = async (req, res = response) => {

  const { id } = req.params
  const { isDeleted, user, ...data } = req.body

  data.name = data.name.toUpperCase()
  data.user = req.user._id

  const category = await Category.findByIdAndUpdate(id, data, { new: true })

  res.json(category)  
}

const deleteCategory = async (req, res = response) => {
  
  const { id } = req.params
  const category = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

  res.json(category)  
}


module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}