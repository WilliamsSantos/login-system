class TesteController {
    constructor(User) {
        this.user = User;
    }

    async checkLoginExistences(login, type) {
        try { 
            switch ( type ) {
              case "email":
                //console.log(145);
                const email_data = '"'+login+'"';
                //console.log("email data: "+email_data);
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
}

module.exports = TesteController;