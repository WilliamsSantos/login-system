// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const mongoose  = require('./config/mongodb');


//Routes reclare
const Routes = require('./routes/routes');

  // Call route
  Routes.forEach((route, index) => {
      fastify.route(route);
  });


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
