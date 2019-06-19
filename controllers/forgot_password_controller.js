//Scripts and aux plugin
import { checkLoginType, checkLoginExistences, checkUserEmail } from "../app/assets/js/scripts";

  // Get Data Models
  const User = require('../models/User');
  const forgottenPassword = require('../models/ForgottenPassword');


exports.checkLoginType = async (req, reply) => {
  
  const { login } = req.body;


  if ( login ) {
    
    try {
     
      var email = null;
      const type = await checkLoginType(login);
     
      if( type ){

        const user =  await checkLoginExistences(login, type);
        console.log(" Login existense : "+user)

        if( user ){

          email = checkUserEmail(user.id);
          console.log(" email existense : "+user)

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