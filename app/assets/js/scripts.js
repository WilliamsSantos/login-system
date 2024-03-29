// Plugin
const boom = require('boom'); 
const crypto = require('crypto');


// Get Data Models
    const User = require('../../../models/User');
    const AcessToken = require('../../../models/AccessToken');

/*
*     
*    scripts and auxiliary functions
*
*/

function isNumber ( number ){ return !isNaN(parseFloat( number )) && isFinite( number ); }
function emailValidates ( email ) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String( email ).toLowerCase());
}

/*
*     
*    Functions
*
*/

export async function encryptText( encrypted ) {
  var str = encrypted || '';
  const md5 = crypto.createHash('md5').update(str).digest('hex');
  return md5; 
}

export async function checkLoginType ( login ) {

        //console.log(" it checkLoginType ");
        
        //console.log("Valor login: "+login );
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
          
          
              if( regex.test(login) ){
      
                type = "username";
          
              }
          }
          
          //console.log("Valor : "+ type);
      
          if ( type != null ) {

              //console.log("Resultado do "+ type);
              return( type );
          
          }
        
      return(false);
}     
    
export async function checkLoginExistences ( login, type ) {
      
  try
   { 
        switch ( type ) {
          case "email":
            
            //console.log(145);

            const email_data = '"'+login+'"';

            //console.log("email data: "+email_data);

              User.findOne({email:"contato@giryco.com"}, ( err, data ) => {
                
                if ( err ) throw err;
                  
                  if ( data === null || data === [] ){ return []};
                  //console.log(" Dado do form : " + login + " Login type : " + type + "Res:"+ data+"\n");
                
                  //console.log(data);
                return true; 
              });
    
            break;
      
          case "username":
            
            //console.log(166);
    
              User.findOne({ username:`${login}`}, ( err, data ) => {
                      
                if ( err ) throw err;
                  
                  if ( data === null || data === [] ) {
            
                    return [];
                  
                  }
                
                  //console.log(" Dado do form : " + login + " Login type : " + type + "Res:"+ data);
                
                return data ; 
              
              });
    
            break;
    
          case "cpf":
    
            //console.log(189);
          
              User.findOne({ cpf:`${login}`}, ( err, data ) => {
                      
                if ( err ) throw err;
                  
                  if ( data === null || data === [] ) {
            
                    return [];
                  
                  }
                
                 // console.log(" Dado do form : " + login + " Login type : " + type + "Res:"+ data);
                
                return data ; 
              
              });
              
            break;
    
          case "cnpj":
          
            //console.log(211);
          
              User.findOne({ cnpj:`${login}`}, ( err, data ) => {
                        
                if ( err ) throw err;
                  
                  if ( data === null || data === [] ) {
            
                    return [];
                  
                  }
                
                  //console.log(" Dado do form : " + login + " Login type : " + type + "Res:"+ data);
                
                return data ; 
              
              });
          
            break;  
    
          default:
          
              //console.log(232);
            
            return [];
        
        } 
        
      } catch ( e ) {
      
        boom.boomify(e);
     
      }
};
  
export async function checkPasswordExistence ( user_id, password ) {
      
      try {
    
        //I need FIX it
        User.findOne({ }, ( err, data ) => {
          
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
  
export async function creatToken ( user_id ) {
     
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
};

export async function checkUserEmail (user_id) {};

