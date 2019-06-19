// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const mongoose = require('./config/mongodb');


const userRouter = require('./routes/users');
const forgotPasswordRouter = require('./routes/forgotPassword');

// ROUTES DECLARE
fastify.post('/user/login', userRouter.login );
fastify.post('/user/forgotPassword', forgotPasswordRouter.forgotPassword );


// NEXT ROUTES TO CREATE

// method: 'GET',
//    url: '/user/forgotPassword',
//    handler: forgotPasswordRouter.checkLoginType
// 
// method: 'POST',
//    url: '/user/recoverPassword/',
//    handler: recoverPasswordRouter.checkLoginType
// 
// method: 'GET',
//    url: '/user/checkToken',
//    handler: checkTokenRouter.checkToken


//Connection database Mongodb test
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', (err) => {
  console.log("Db Erro\n");
});
mongoose.connection.on('disconnected', () => {
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
