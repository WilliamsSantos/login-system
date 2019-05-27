const http = require('http');

  //Error plugin
  const boom = require('boom');

    // Get Data Models
    const User = require('../models/User');
    const AcessToken = require('../models/AccessToken');

//Router exports
exports.login = async ( req, reply ) => {
  
  const { login, password } = req.body;

  if( login && password ) { 

    const login_type = checkLoginType( login );   
    console.log("Login type: "+login_type+"\n" );

    if ( login_type ) {
  
      const user_existence = checkLoginExistences( login, login_type ); 
      console.log("user_existence: "+user_existence+"\n" );
      
      if ( user_existence ) {

        const password_existence = checkPasswordExistence( user_existence.id, password ); //Aqui ele recupera o id do resultado data
        console.log("password_existence: "+password_existence+"\n");
        
        if ( password_existence ) {

          const user_existense = password_existence;
          creatToken(user_existense.id);
          console.log("U usuario n existe "+creatToken(user_existence.id));
          
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
        
          console.log("Passwordot existense "+ user_existence +"\n");
        
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

        console.log("User not existense"+ user_existence +"\n");
      
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
    
    if ( !password ) {
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
 

const checkLoginType = ( login ) => {

var type = null;
    
  //
  // Check the type of login and add the value to type var
  //

    if ( isNumber(login.replace(/[\.,-/]/g, "")) ) {
        
      const login_params  = login.trim().replace(/[^\d]+/g,'');
        
        if ( login_params.length === 11 ) {

          type = "cpf";

        } else if ( login_params.length === 14 ) {

          type = "cnpj";

        }

    } else if ( emailValidates( login.trim().toLowerCase()) ) { 
      
      type = "email";
  
    } else {

      var regex = new RegExp("^[a-zA-Z0-9-Zàèìòùáéíóúâêîôûãõ\b]+$");
    
        if(regex.test(login)){
          type = "username";
        }
    }

    if ( type != null ) {

      return ( type );
    
    }
  
  return false;

}

const checkLoginExistences = ( login, type ) => {
  
  try {
    
    User.findOne({ type : login }, ( err, data ) => {
      
      if ( err ) throw err;
      
      if ( data === null || data === [] ) {

        return false;
      
      }

      return( data ); 
    
    });
  
  } catch ( e ) {
  
    boom.boomify(e);
 
  }
};

const checkPasswordExistence = ( user_id, password ) => {
  
  try {

    User.findOne({ user_id, password }, ( err, data ) => {
      
      if ( err ) throw err;
      
        if ( data === null || data === [] ) {
        
          return false;
        
        }
        
        reply
          .header('Content-Type', 'application/json; charset=utf-8')
          .send({
            "statusCode": 200,
            "result": 'Form OK',
            "green": 1,
            "redCode": 0,
            "message": "All Ok.",
            "stackResult": {
              "message": "OK"
            },
          });
      
      return( data ); 
      
    });
  } catch (e) {

    boom.boomify(e);
 
  }

};

const creatToken = ( user_id ) => {
 
  try {

    const acessTokenCreate = new AcessToken( user_id );
    
      try {

        acessTokenCreate.save();
      
      } catch (e) {
      
        boom.boomify(e);
      
      return false;
      
      } 
  } catch ( e ) {
    
    boom.boomify(e);
  
  }
}


//Aux functions
const isNumber = ( n ) => {
  return !isNaN(parseFloat( n )) && isFinite( n );
}

const emailValidates = ( email ) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String( email ).toLowerCase());
}
