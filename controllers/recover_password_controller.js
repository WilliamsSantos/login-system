const boom = require('boom');

// Get Data Models
const user = require('../models/User');

// Get all cars
exports.checkLoginType = async (req, reply) => {
  try {
    return ({
        message:"Funcionando get recover password"
    });
  } catch (err) {
    return ({
        error: boom.boomify(err)
    })
  
  }
}
