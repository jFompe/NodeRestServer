const { Schema, model } = require('mongoose')


const CategorySchema = Schema({
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
  }
})

CategorySchema.methods.toJSON = function() {
  const { __v, isDeleted, ...data } = this.toObject()
  return data
}


module.exports = model('Category', CategorySchema)