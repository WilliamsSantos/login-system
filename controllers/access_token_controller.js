const boom = require('boom');

// Get Data Models
const accessToken = require('../models/AccessToken');

// Get all cars
exports.checkToken = async (req, reply) => {
  try {
    return ({
        message:"Check Token working!!"
    });
  } catch (err) {
   reply
    .send()
  }
}