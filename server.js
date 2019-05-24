// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const mongoose  = require('./config/mongodb');


//Routes reclare
const userRoutes = require('./routes/user_routes');
const acessTokenRoutes = require('./routes/access_token_routes');
const recoverPasswordRoutes = require('./routes/recover_password_routes');
const forgotPasswordRoutes = require('./routes/forgot_password_routes');



// Call routes
userRoutes.forEach((route, index) => {
    fastify.route(route);
})

acessTokenRoutes.forEach((route, index) => {
    fastify.route(route);
})

recoverPasswordRoutes.forEach((route, index) => {
    fastify.route(route);
})

forgotPasswordRoutes.forEach((route, index) => {
    fastify.route(route);
})





//Connection database Mongodb test
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error',(err)=>{
    console.log("Db Erro\n");
})

mongoose.connection.on('disconnected',() => {
    console.log("Db Disconnectes\n");
})

mongoose.connection.on('connected', () => {
    console.log("Db connected\n");
})


// Run the server!
const start = async () => {
  try {
    await fastify.listen(8080);
    fastify.log.info(`server listening on ${fastify.server.address().port}\n`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()