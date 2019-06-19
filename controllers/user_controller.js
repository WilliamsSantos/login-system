import { encryptText } from '../app/assets/js/scripts'  

class UserController {
    
    constructor( User, Accesstoken ) {
        this.user = User;
        this.accesToken = Accesstoken;
    }

    async checkLoginExistences( login, type ) {
        try { 
            
            switch ( type ) {
              
              case "email":
                
                const UserExistence = await this.user.findOne({ "email": login }).exec();
                return UserExistence;

              case "username":
                
                //console.log(166);
        
                this.user.findOne({ username:`${login}`}, ( err, data ) => {
                          
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
              
                this.user.findOne({ cpf:`${login}`}, ( err, data ) => {
                          
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
              
                this.user.findOne({ cnpj:`${login}`}, ( err, data ) => {
                            
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
          
            console.log(e);
         
          }
    }

    async checkPasswordExistence ( user_id, password ) {

      try {

        var result = await encryptText(password);

          const PasswordExistence = await this.user.findOne( { "_id": user_id,  "password": result } ).exec();
                
        return PasswordExistence;
        
      } catch (e) {
    
        console.log(e);
     
      }
    };
    
}

export default UserController;