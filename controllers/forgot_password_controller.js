const boom = require('boom');

// Get Data Models
const forgottenPassword = require('../models/ForgottenPassword');

// Get all cars
exports.checkLoginType = async (req, reply) => {
  const { email, name, cpf_cnpj } = req.body;

  try {
   if(email || name || cpf_cnpj){
    reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({
        "statusCode": 200,
        "result" : 'Form OK',
        "green" : 1,         
        "redCode" : 0,     
        "message" : "All Ok.",
        "stackResult" : {
          "message": "OK"
        }
      });
   }
   reply
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ 
          "statusCode" : 404,
          "result" : 'email not found ',
          "green" : 0,       
          "redCode" : 2,     
          "message" : "You need Fill email.",
          "stackResult" : {
           "message" :`error: Email not found!`
          }
        });
  } catch (e) {
    return boom.boomify(e);
  }
}



/*
// Get single car by ID
exports.getSingleCar = async (req, reply) => {
  try {
    const id = req.params.id
    const car = await Car.findById(id)
    return car
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new car
exports.addCar = async (req, reply) => {
  try {
    const car = new Car(req.body)
    return car.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing car
exports.updateCar = async (req, reply) => {
  try {
    const id = req.params.id
    const car = req.body
    const { ...updateData } = car
    const update = await Car.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a car
exports.deleteCar = async (req, reply) => {
  try {
    const id = req.params.id
    const car = await Car.findByIdAndRemove(id)
    return car
  } catch (err) {
    throw boom.boomify(err)
  }
}
*/