// Error plugin
const boom = require('boom');


  // Get Data Models
  const User = require('../models/User');
  const forgottenPassword = require('../models/ForgottenPassword');


exports.checkLoginType = async (req, reply) => {
  
  const { login } = req.body;


  if (login) {
    try {
     
      var email = null;
      const type = checkLoginType(login);
     
      if(type){

        const user =  checkLoginExistences(login, type);
        
        if(user){

          checkUserEmail(user.id);


        }else{
          //console.log("User not existense"+ user_existence +"\n");
          reply
          .header('Content-Type', 'application/json; charset=utf-8')
          .send({
            "statusCode": 500,
            "result": `No register in database!`,
            "green": 0,
            "redCode": 5,
            "message": `No query result`,
            "stackResult": {
              "message": "Error: No query result"
            }
          });
        }
      }else{
        reply
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
          "statusCode": 404,
          "result": 'Login field is empty',
          "green": 0,
          "redCode": 1,
          "message": "You need Fill the login field.",
          "stackResult": {
            "message": `error: Field login is empty`
          }
        });
      }
    } catch (e) {
      return boom.boomify(e);
    }
  }else{
    reply
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      "statusCode": 404,
      "result": 'Login field is empty',
      "green": 0,
      "redCode": 1,
      "message": "You need Fill the login field.",
      "stackResult": {
        "message": `error: Field login is empty`
      }
    });
  }
}


function checkLoginType(login) {
  var type = null;
   
//
// Check the type of login and add the value to type var
//
  if(isNumber(login)){
      
      const login_params  = login.trim().replace(/[^\d]+/g,'');
      
      if(login_params.length === 11){
        type = "cpf";

      }else if(login_params.length === 14){
        type = "cnpj";

      }

  }else if(emailValidates(login.trim().toLowerCase())){ 
      type = "email";
 
  }else {

    var regex = new RegExp("^[a-zA-Z0-9-Zàèìòùáéíóúâêîôûãõ\b]+$");
    if(regex.test(login)){
      type = "username";
    }

}
    if(type != null){
      return(type);
    }
  return false;
}

function checkLoginExistences(login, type) {
  try {
    User.findOne({ type : login }, (err, data) => {
      if (err) throw err;
      if (data === null || data === []) {
        return false;
      }
      return(data); 
    });
  }
  catch (e) {
      boom.boomify(e);
  }
};


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