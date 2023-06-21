var conn = require('./connect.model').conn
var crypto = require('crypto')

module.exports = {
    logIn: async(user, password) => {
        try{
            var query_string = `SELECT * FROM ACCOUNT WHERE username = '${user}'`
            let  result = (await conn).query(query_string)
            if( (await result) !== undefined) {
                var accPass = (await result).recordset[0].password; 
                var crypto_pass = crypto.createHash('md5').update(password).digest('hex');
                if(crypto_pass.toUpperCase() == accPass){
                    return true;
                }
            }            
            return false
        
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    user: async(username) =>{
        try{
            var query_string = `SELECT * FROM ACCOUNT WHERE username = '${username}'`
            let user = (await conn).query(query_string);
            return (await user).recordset[0];
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}
