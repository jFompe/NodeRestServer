const { response } = require("express");
const { request } = require("express");



const isAdminRole = (req = request, res = response, next) => {

  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Trying to verify role w/o a correct authenticated user'
    })
  }

  const { role, name } = req.user
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} has no permission for this action`
    })
  }

  next()
}


const hasRole = (...roles) => {  
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `One of ${roles} is necessary`
      })
    }
    next()
  }
}




module.exports = {
  isAdminRole,
  hasRole
}