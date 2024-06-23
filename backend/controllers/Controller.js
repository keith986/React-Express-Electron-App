const Users = require('../models/signupModel')
const {hashPassword, comparePassword} = require('../configs/passwordauth')
const jwt = require('jsonwebtoken')
const Store = require('../models/storeModel')

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
        
        const userlogins = req.body.login;
        const user_name = userlogins.username;
        const usernames = user_name.toString();
        const userpass = userlogins.password;
        const user_password = userpass.toString();

        const userdata = await Users.findOne({username: usernames});
       
        if(!userdata){
            return res.json({
                error: "Username not found!"
            })  
        }else{
        const password_match = await comparePassword(user_password, userdata.password);
        if(password_match){
            if(userdata.accounttype === 'Admin'){

            jwt.sign({userdata}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                console.log(token)
               return res.cookie('token',token).json({
                                                      admin : "admin",
                                                      success: "logged In Successfully!",
                                                      user: userdata
                                                    });
               
            })
              
            }
           

            if(userdata.accounttype === 'User'){

                jwt.sign({userdata}, process.env.JWT_SECRET, {}, (err, token) => {
                    if(err) throw err;
                    console.log(token)
                   return res.cookie('token',token).json({
                                                          user : "user",
                                                          success: "logged In Successfully!",
                                                          user: userdata
                                                        });
                   
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

const getProfile = async (req, res) => {
    try{
        const {token} = req.cookies;
        if(token){
            jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
               return res.json(user)
            })
        }else{
            return res.json(null) 
        }
    }catch(err){
        console.log(err.message)
    }
}

const store = async(req, res) => {
    try{
    const storedata = req.body.store;

    if(storedata.storename === ''){
        return res.json({
            error : 'Store name is required'
        })
    }

    if(storedata.manager === ''){
        return res.json({
            error : 'Name of the Manager is required'
        })
    }

    if(storedata.phone === ''){
        return res.json({
            error : 'Phone Number is required'
        })
    }

    if(storedata.location === ''){
        return res.json({
            error : 'Store Address is required'
        })
    }

    if(storedata.status === ''){
        return res.json({
            error : 'Status is required'
        })
    }

    const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {

            if(err) throw err;

            const userID = user.userdata._id;

    const store_data = Store({
                       userid : userID,
                       storename : storedata.storename.toString(),
                       manager : storedata.manager.toString(),
                       location : storedata.location.toString(),
                       phone: storedata.phone.toString(),
                       status : storedata.status.toString()
                       })

         store_data.save()
                   .then((result) => {
                      return res.json({
                        success : 'Successfully Added Store!'
                      })
                   }) 
                   .catch((err) => {
                      return res.json({
                        error : "Failed, Try Again!"
                      })

        })             
                   })             
    }catch(err){console.log(err.message)}
}

const storeData = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {

            if(err) throw err;
            const userid = user.userdata._id;

              Store.find({userid : userid})
                   .then((result) => {
                       res.json(result)
                       console.log(result)
                   })
                   .catch((err) => {
                     res.json(err)
                   }) 

        })
    }catch(error){console.log(error.message)}
}

const editStore = async (req, res) => {
    try{
        const storedt = req.body.store;

        if(storedt.storename === ''){
            return res.json({
                error : 'Store name is required'
            })
        }
    
        if(storedt.manager === ''){
            return res.json({
                error : 'Name of the Manager is required'
            })
        }
    
        if(storedt.phone === ''){
            return res.json({
                error : 'Phone Number is required'
            })
        }
    
        if(storedt.location === ''){
            return res.json({
                error : 'Store Address is required'
            })
        }
    
        if(storedt.status === ''){
            return res.json({
                error : 'Status is required'
            })
        }

       const {token} = req.cookies;

       jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        
        if(err) throw err;

        const userID = user.userdata._id;
        const storeID = req.body.storeid;

        Store.findByIdAndUpdate(storeID, {
                       userid : userID,
                       storename : storedt.storename.toString(),
                       manager : storedt.manager.toString(),
                       location : storedt.location.toString(),
                       phone: storedt.phone.toString(),
                       status : storedt.status.toString()
               })
             .then((result) => {
                res.json({
                    success: 'Successfully Updated' + storedt.storename.toString()
                })
             })
             .catch((err) => {
                res.json({
                    error : err
                })
             })

       })
        
    
    }catch(err){console.log(err.message)}
}

module.exports = {
    signup,
    preview,
    login,
    getProfile,
    store,
    storeData,
    editStore
}