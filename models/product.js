const { Schema, model } = require('mongoose')


const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is mandatory'],
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  }
})

ProductSchema.methods.toJSON = function() {
  const { __v, isDeleted, ...data } = this.toObject()
  return data
}


module.exports = model('Product', ProductSchema)