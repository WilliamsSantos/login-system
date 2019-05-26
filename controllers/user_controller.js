//Error plugin
const boom = require('boom');

// Get Data Models
const User = require('../models/User');

// Get all cars
exports.checkLoginType = async (req, reply) => {
  const { name, email, cpf_cnpj, password } = req.body; 

  //  testes: '{"name":"Ryzzan", "email":"Williams@outlook.com","cpf_cnpj":34565434232, "password":4334345}'
  
  const email_valid = emailValidates(email);
  
  //const validate_cpf_cnpj = cpf_cnpj.trim().replace(/[^\d]+/g,'');
 
  if(email_valid === true){
    try { 
      if (name && email && cpf_cnpj && password){
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
          }).redirect(200, '/user/checkLoginExistences');
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
                    "message" :`error: Password empty`
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
                  "message" :`error: ${this.message}`
                }
          });
        }
      }
    } catch (e) {
      throw boom.boomify(e);
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
            "message" :`error: Email invalid!`
          }
    });
  }
}

exports.checkLoginExistences = async (req, reply) => {
  const { email, password } = req.body; 
 
  try{ 
    User.findOne({email, password }, (err, data) => {
      if (err) {
        reply
          .header('Content-Type', 'application/json; charset=utf-8')
          .send({
            "statusCode" : 500, 
            "result" : 'Error in Query!', 
            "green" : 0,        
            "redCode" : 5,      
            "message" : `Query error`,
            "stackResult" : {
              "message" : "Error: Query database error"
            }
          });
      }
      if(data === null || data === [] ){
        reply
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
          "statusCode" : 500, 
          "result" : 'No user with the params!', 
          "green" : 0,        
          "redCode" : 5,      
          "message" : `No query result`,
          "stackResult" : {
            "message" : "Error: No query result"
          }
        });
      }
      reply
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(" user: "+data, 
          { 
            "statusCode": 200,
            "result" : 'Form OK',
            "green" : 1,         
            "redCode" : 0,     
            "message" : "All Ok.",
            "stackResult" : {
              "message": "OK"
          },
        });
    });
  }catch(e){
    boom.boomify(e);
  }
}

exports.checkPasswordExistence = async (req, reply) => {
  try{

  }catch(e){
    boom.boomify(e);
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


const emailValidates =(email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
