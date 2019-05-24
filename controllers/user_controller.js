const boom = require('boom');

// Get Data Models
const User = require('../models/User');

// Get all cars
exports.checkLoginType = async (req, reply) => {
  const { name, email, cnpj, cpf, password } = checkLogin(req);

  // {"name":"Ryzzan", "email":"Williams@outlook.com","cpf":2342, "cnpj":123231}
  
 try { 
    if (checkLogin){
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
          .redirect('/user/checkLoginExistences');
    }else{
      reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ 
            "statusCode" : 404, //# Resposta de protocolo
            "result" : 'Some input of Form is empty', //#retorna o valor esperado
            "green" : 0,        //# 1 = sucess 0 = error  
            "redCode" : 1,      //# Id da mensagem de erro
            "message" : "You need Fill all the form.",// #mensagem vinculada ao login
            "stackResult" : {
              "message" :`error: ${boom.boomify(err)}`
            }
      });
    }
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.checkLoginExistences = async (req, reply) => {
  const { name, email, cnpj, cpf, password } = checkLogin(req);

  try{
    const data = mongoose.find({  name:checkLogin.name, 
                                  email: checkLogin.email,
                                  cnpj: checkLogin.cnpj, 
                                  cpf: checkLogin.cpf, 
                                  password: checkLogin.password  
                                }); 
    
    if(data){
      reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({
        "statusCode" : 200, //# Resposta de protocolo
          "result" : 'Some input of Form is empty', //#retorna o valor esperado
          "green" : 1,        //# 1 = sucess 0 = error  
          "redCode" : 3,      //# Id da mensagem de erro
          "message" : "Login Sucess!.",// #mensagem vinculada ao login
          "stackResult" : {
            "message" : "User as loged-in"
          }
      }) 
    }
  }catch(err){
    throw boom.boomify(err)
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