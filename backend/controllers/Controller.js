const Users = require('../models/signupModel')
const bcrypt = require('bcrypt')

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
        console.log(admpass);

        const passcode = await bcrypt.hash(admpass, 10);

        if(value.companyname === ''){  
            res.json({
                error  : 'Company name required!'
            })
        }

        if(value.companyemail === ''){
            res.json({
                error :  'Company Email required!'
            })
        }

        if(value.companyphone === ''){
            res.json({
                error :  'Company phone number required!'
            })
        }

        if(value.companylocation === ''){
            res.json({
                error : 'Company address required!'
            })
        }

        if(value.fullname === ''){
            res.json({
                error : 'Amin Full name required!'
            })
        }

        if(value.adminusernname === ''){
            res.json({
                error : 'Admin username required!'
            })
        }

        if(value.adminemail === ''){
            res.json({
                error : 'Admin email required!'
            })
        }

        if(value.adminphone === ''){
            res.json({
                error : 'Admin phone number required!'
            })
        }

        if(value.adminpassword === '' || vpass.length < 8){
                res.json({
                    error : 'Admin password required and should be longer than 8 characters!'
                })
        }

        var admemail = value.adminemail;
        var compemail = value.adminemail
        const exist = await Users.findOne({compemail});

             if(exist){
                res.json({
                    error : "Company Email address already taken"
                })
             }

             const exists = await Users.findOne({admemail});

             if(exists){
                res.json({
                    error : "Admin Email address already taken"
                })
             }

        if(value.companyname !== '' && value.companyemail !== '' && value.companyphone !== '' && value.companylocation !== '' && value.fullname !== '' && value.adminemail !== '' && value.adminphone !== '' && value.adminusername !== '' && value.adminpassword !== ''){
     
        const usersdata = Users({
            companyname : value.companyname,
            companyemail: value.companyemail,
            companyphone: value.companyphone,
            companylocation: value.companylocation,
            fullname: value.fullname,
            username: value.adminusername,
            adminemail: value.adminemail,
            adminphone: value.adminphone,
            adminpassword: passcode,
            accounttype: 'Admin'
        })

        usersdata.save()
                 .then((result) => {
                   res.json('success')
                    console.log('New Admin Account created')
                 })
                 .catch(err => {
                    res.json('failed')
                    console.log('THE ERROR IS HERE ' + err)
                 })
       
                }else{
                    console.log('errors')
                }         

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    signup,
    preview
}