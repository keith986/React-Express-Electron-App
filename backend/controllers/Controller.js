const Users = require('../models/signupModel')
const {hashPassword, comparePassword} = require('../configs/passwordauth')

const preview = async(req, res) => {
    try{
        res.send('This is working......')
    }catch(err){
        console.log(err.message)
    }
}

const signup = async(req, res) => {
    try {
        console.log(req.body);
        var value = req.body.isValue;

        const vpass = value.adminpassword;
        const admpass = vpass.toString();

        const passcode = await hashPassword(admpass);


        console.log(passcode);

        if(value.companyname === ''){  
          return  res.json({
                error  : 'Company name required!'
            });
        }

        if(value.companyemail === ''){
            return res.json({
                error :  'Company Email required!'
            });
        }

        if(value.companyphone === ''){
            return res.json({
                error :  'Company phone number required!'
            });
        }

        if(value.companylocation === ''){
            return res.json({
                error : 'Company address required!'
            });
        }

        if(value.fullname === ''){
            return res.json({
                error : 'Admin Full name required!'
            });
        }

        if(value.adminusername === ''){
            return res.json({
                error : 'Admin username required!'
            });
        }

        if(value.adminemail === ''){
            return res.json({
                error : 'Admin email required!'
            });
        }

        if(value.adminphone === ''){
            return res.json({
                error : 'Admin phone number required!'
            });
        }

        if(value.adminpassword === ''){
                return res.json({
                    error : 'Admin password required!'
                });
        }

        var admemail = value.adminemail.toString();
        var compemail = value.adminemail.toString();

        const existing = await Users.findOne({compemail})
        if(existing){
            return res.json({
                error : "Company Email address already taken"
            })
        }

        const exist = await Users.findOne({admemail})
        if(exist){
            return res.json({
                error : "Admin Email address already taken"
            })
        }

        const usersdata = await Users({
            companyname : value.companyname.toString(),
            companyemail: value.companyemail.toString(),
            companyphone: value.companyphone.toString(),
            companylocation: value.companylocation.toString(),
            fullname: value.fullname.toString(),
            username: value.adminusername.toString(),
            adminemail: value.adminemail.toString(),
            adminphone: value.adminphone.toString(),
            password: passcode,
            accounttype: 'Admin'
        })

        usersdata.save()
                 .then((result) => {   
                    console.log('New Admin Account created')
                    return res.json({
                        success : "successfully signed up"
                    })
                 })
                 .catch(err => {
                    console.log('THE ERROR IS HERE ' + err)
                    return res.json({
                        error : "something went wrong please try again!"
                    })
                 })      

    } catch (error) {
        console.log(error.message)
    }
}

const login = async (req, res) => {
    try{
        console.log(req.body)
        const userlogins = req.body.login;
        const user_name = userlogins.username;
        const usernames = user_name.toString();
        const userpass = userlogins.password;
        const user_password = userpass.toString();

        const userdata = await Users.find({usernames})
console.log(userdata)
        if(!userdata.length){
            return res.json({
                error: "Username not found!"
            }) 
        }else{
        const password_match = await comparePassword(user_password, userdata.password);
        if(password_match){
            if(userdata.accounttype === 'Admin'){
            return res.json({
                admin : "admin",
                success: "logged In Successfully!"
            })
            }

            if(userdata.accounttype === 'User'){
                return res.json({
                    admin : "user",
                    success: "logged In Successfully!"
                })
            }


        }else{
            return res.json({
                error: "Incorrect Password"
            })
        }

    }

    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    signup,
    preview,
    login
}