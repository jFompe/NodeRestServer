const { Schema, model } = require('mongoose')


const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is mandatory']
  },
  mail: {
    type: String,
    required: [true, 'Mail is mandatory'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is mandatory']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: [true, 'Role is mandatory'],
    default: 'USER_ROLE', 
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isGoogleUser: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id
  return user
}



module.exports = model('Users', UserSchema)