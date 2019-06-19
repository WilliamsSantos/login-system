// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const mongoose  = require('./config/mongodb');

const userRouter              = require('./routes/user_router');
// const recoverPassword          = require('../controllers/recover_password_controller');
// const checkTokenController     = require('../controllers/access_token_controller');
// const forgotPasswordController = require('../controllers/forgot_password_controller');



fastify.post('/user/login', userRouter.login);



  //Connection database Mongodb test
  mongoose.set("useCreateIndex", true);
  mongoose.connection.on('error',(err)=>{
      console.log("Db Erro\n");
  });

  mongoose.connection.on('disconnected',() => {
      console.log("Db Disconnectes\n");
  });

  mongoose.connection.on('connected', () => {
      console.log("Db connected\n");
  });

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8080);
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}; 
start();
