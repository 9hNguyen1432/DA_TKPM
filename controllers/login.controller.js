const account = require('../models/account')
const Ulti = require("../public/js/ulti");
var info = Ulti.getCurYearSem();
var semester = info[0]
var curYear = info[1];

class LoginPageController{
    async loadPage(req,res){
        res.render('login_page',{header: 'none'});
    }

    async logIn(req, res, next){
        const {username , password} = req.body;
        let errors =[]

        if(!username || !password){
            errors.push("Vui lòng điền đầy đủ thông tin. ")
            res.render('login_page',{username,password, errors,header:'none'})
        }
        else{
            var result = await account.logIn(username,password)
            if(result != true){
               
                errors.push("Tài khoản hoặc mật khẩu không chính xác");
              
                return res.render('login_page',{username,password,errors,header:'none'} );

            }else{
                
                const user = await account.user(username)
                
                req.session.regenerate(function (err) {
                    if (err) next(err)
                    req.session.user = {
                        ...user,
                    };
  
                    req.session.save(function (err) {
                        if (err) return next(err)
                        res.redirect(`/home`)
                    })
                })
    
            }
        }
    }

    async logOut(req, res, next){
        req.session.destroy();
        res.redirect('/');
    }
} 

module.exports = new LoginPageController;