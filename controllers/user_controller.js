const boom = require('boom');

// Get Data Models
const User = require('../models/User');

// Get all cars
exports.checkLoginType = async (req, reply) => {
  const { name, email, cpf_cnpj, password } = req.body; 
  //  testes: '{"name":"Ryzzan", "email":"Williams@outlook.com","cpf_cnpj":34565434232, "password":4334345}'
  const email_validate = emailValidates(email);

  if(email_validate === true){
    try { 
      if (name && email && cpf_cnpj && password){
        reply
          .header('Content-Type', 'application/json; charset=utf-8')
          .redirect('/user/checkLoginExistences')
          .send({ 
                "statusCode": 200, //# Resposta de protocolo
                "result" : 'Form OK', //#retorna o valor esperado
                "green" : 1,        //# 1 = sucess 0 = error  
                "redCode" : 0,      //# Id da mensagem de erro
                "message" : "All Ok.",// #mensagem vinculada ao login
                "stackResult" : {
                  "message": "OK" //#Retorna o objeto de retorno(informações do erro), lista de tratamento;
                },
          })
        
      }else{
        if(!password){
          reply
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ 
                  "statusCode" : 404,
                  "result" : 'Password is empty',
                  "green" : 0,       
                  "redCode" : 1,     
                  "message" : "You need fill the password field.",
                  "stackResult" : {
                    "message" :`error: ${boom.boomify(err)}`
                  }
            });
        }else{
          reply
          .header('Content-Type', 'application/json; charset=utf-8')
          .send({ 
                "statusCode" : 404,
                "result" : 'Some input of Form is empty',
                "green" : 0,       
                "redCode" : 1,     
                "message" : "You need Fill all the form.",
                "stackResult" : {
                  "message" :`error: ${boom.boomify(err)}`
                }
          });
        }
      }
    } catch (err) {
      throw boom.boomify(err)
    }
  }else{
    reply
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ 
          "statusCode" : 404,
          "result" : 'email is invalid',
          "green" : 0,       
          "redCode" : 1,     
          "message" : "You need Fill all the form.",
          "stackResult" : {
            "message" :`error: ${boom.boomify(err)}`
          }
    });
  }
}

exports.checkLoginExistences = async (req, reply) => {
  const { email, password } = req.body; 
  
  try{ 
    User.find({ email, password }, (err, data) => {
      if (err) {
        reply
          .header('Content-Type', 'application/json; charset=utf-8')
          .send({
          "statusCode" : 500, 
            "result" : 'No user with the params!', 
            "green" : 0,        
            "redCode" : 5,      
            "message" : "No data Found.",
            "stackResult" : {
              "message" : `Error: ${boom.boomify(err)}`
            }
          });
      }
      reply
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ 
              "statusCode": 200, //# Resposta de protocolo
              "result" : 'Form OK', //#retorna o valor esperado
              "green" : 1,        //# 1 = sucess 0 = error  
              "redCode" : 0,      //# Id da mensagem de erro
              "message" : "All Ok.",// #mensagem vinculada ao login
              "stackResult" : {
                "message": "OK" //#Retorna o objeto de retorno(informações do erro), lista de tratamento;
              },
        })
    });
  }catch(err){
    throw boom.boomify(err);
  }
}

/*

function newFunction_1(req) {
  const name = req.body.name;
  const email = req.body.email;
  const cnpj = req.body.cnpj;
  const cpf = req.body.cpf;
  const password = req.body.password;
  return { name, email, cnpj, cpf, password };
}

function newFunction(req) {
  const name = req.body.name;
  const email = req.body.email;
  const cnpj = req.body.cnpj;
  const cpf = req.body.cpf;
  const password = req.body.password;
  return { name, email, cnpj, cpf, password };
}

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


const emailValidates =(email) =>{
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
