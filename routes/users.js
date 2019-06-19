const User = require('../models/User');

import { checkLoginType, checkLoginExistences, checkPasswordExistence, creatToken } from "../app/assets/js/scripts";

  const UsuarioController = require('../controllers/user_controller').default;
  const usuario = new UsuarioController(User);

exports.login = async ( req, reply ) => {

const { login, password } = req.body;

if ( login && password ) { 

  const login_type = await checkLoginType( login );
  console.log("Login type: "+login_type+"\n");

  if ( login_type ) {
  
    const user_existence = await usuario.checkLoginExistences( login, login_type ); 
    // console.log("user_existence: "+user_existence+"\n" );
    
    if ( user_existence ) {

      const password_existence =  await usuario.checkPasswordExistence( user_existence.id, password );
      // console.log("password_existence: "+password_existence+"\n");
      
      if ( password_existence ) {

        const user_existense = password_existence;
        // console.log(user_existence, 123455);

        await creatToken(user_existense.id);
        // console.log("O usuario existe "+creatToken(user_existence.id));
        
        reply
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
          "statusCode": 404,
          "result": 'Login successfully',
          "green": 0,
          "redCode": 1,
          "message": "",
          "stackResult": {
            "message": `login done successfully!s `
          }
        });
      } else {
      
        // console.log("Password not existense "+ user_existence +"\n");
      
        reply
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            "statusCode": 404,
            "result": 'Invalid password',
            "green": 0,
            "redCode": 1,
            "message": "Password invalid.",
            "stackResult": {
                  "message": `error: Password is invalid.`
            }
        });
      }
    } else {

      // console.log("User not existense "+ user_existence +"\n");
    
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
  } else {

    reply
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(
      {
        "statusCode": 404,
        "result": 'Invalid value',
        "green": 0,
        "redCode": 1,
        "message": "Insert a valid login.",
        "stackResult": {
              "message": `error: Invalid type.`
        }
      }
    );
  }
} else {
  
  if ( !password && !login ) {
    reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({
        "statusCode": 404,
        "result": 'Form is empty.',
        "green": 0,
        "redCode": 1,
        "message": "You need fill the form.",
        "stackResult": {
          "message": `error: You need fill all field form.`
        }
      });

  }else if(!password){
    reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({
        "statusCode": 404,
        "result": 'Password is empty.',
        "green": 0,
        "redCode": 1,
        "message": "You need Fill the password.",
        "stackResult": {
          "message": `error: password is empty.`
        }
      });
  }

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
