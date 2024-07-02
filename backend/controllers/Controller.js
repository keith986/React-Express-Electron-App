const Users = require('../models/signupModel')
const {hashPassword, comparePassword} = require('../configs/passwordauth')
const jwt = require('jsonwebtoken')
const Store = require('../models/storeModel')
const Suppliers = require('../models/supplierModel')
const Categories = require('../models/categoryModel')
const Products = require('../models/productModel')
const rows = require('../models/rowModel')

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


        const usersdata = await Users({
            adminId : '',
            warehouse: '',
            role: '',
            useremail : '',
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
                                                      admin : "Admin",
                                                      success: "logged In Successfully!",
                                                      user: userdata
                                                    });
               
            })
              
            }
           

            if(userdata.accounttype === 'staff'){

                jwt.sign({userdata}, process.env.JWT_SECRET, {}, (err, token) => {
                    if(err) throw err;
                    console.log(token)
                   return res.cookie('token',token).json({
                                                          staff : "staff",
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
        console.log('prof' + err.message)
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

const deletestore = async(req,res) => {
    try{
        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {} , (err, user) => {
            if (err) throw err;

            const storeIDentity = req.body.deleting;

            Store.findByIdAndDelete(storeIDentity)
                 .then((result) => {
                    return res.json({
                                success: 'Successfully Deleted!'
                                   })
                 })
                 .catch((err) =>{
                    return res.json({
                                error: err
                                   })
                 })

        })

    }catch(err){res.json({error: err})}
}

const adduser = async(req,res) => {
    try{
        const {token} = req.cookies;
        var value = req.body.addUser;

            const vpass = value.password;
            const userpass = vpass.toString();
    
            const passcode = await hashPassword(userpass);

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    
            if(value.fullname === ''){  
              return  res.json({
                    error  : 'Full name required!'
                });
            }
    
            if(value.email === ''){
                return res.json({
                    error :  'Email Address required!'
                });
            }
    
            if(value.username === ''){
                return res.json({
                    error :  'Username is required!'
                });
            }
    
            if(value.password === ''){
                return res.json({
                    error : 'Password is required!'
                });
            }
    
            if(value.role === ''){
                return res.json({
                    error : 'User role is required!'
                });
            }
    
            if(value.warehouse === ''){
                return res.json({
                    error : 'Warehouse is required!'
                });
            }

            const userdetail = Users({
                adminId : user.userdata._id,
                fullname : value.fullname.toString(),
                useremail : value.email.toString(),
                username : value.username.toString(),
                accounttype: value.password.toString(),
                warehouse: value.warehouse.toString(),
                role: value.role.toString(),
                companyname : '',
                companyemail: '',
                companyphone: '',
                companylocation: '',
                adminemail: '',
                adminphone: '',
                password: passcode,
            })

            userdetail.save()
                      .then((result) => {
                          return res.json({
                            success : 'Successfully added User'
                          })
                        })
                      .catch((err) => {
                        return res.json({
                            error : err
                        })

                        console.log(err)
                      })
    
        })

    }catch(err){ return res.json({error : err})}
}

const users = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminId = user.userdata._id;

            Users.find({adminId : adminId})
                 .then((result) => {
                    return res.json(result)
                 })
                 .catch(err => {
                    return res.json({
                        error : err
                    })
                 })

        })

    }catch(err){res.json({error : err})}
}

const deleteuser = async (req, res) => {
    try{

        const deleteId = req.body.deleting;
        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {

            Users.findByIdAndDelete(deleteId)
                 .then((result) => {
                    return res.json({
                              success : 'Successfully Deleted User' 
                            })
                 })
                 .catch((error) => {
                    return res.json({
                        error : error
                    })
                 })
                 

        })

    }catch(error){
        return res.json({
            error : error
        })
    }
}

const edituser = async (req,res) => {
    try{

        const {token} = req.cookies;
        var value = req.body.addUser;

            const vpass = value.password;
            const userpass = vpass.toString();
    
            const passcode = await hashPassword(userpass);

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    
            if(value.fullname === ''){  
              return  res.json({
                    error  : 'Full name required!'
                });
            }
    
            if(value.email === ''){
                return res.json({
                    error :  'Email Address required!'
                });
            }
    
            if(value.username === ''){
                return res.json({
                    error :  'Username is required!'
                });
            }
    
            if(value.password === ''){
                return res.json({
                    error : 'Password is required!'
                });
            }
    
            if(value.role === ''){
                return res.json({
                    error : 'User role is required!'
                });
            }
    
            if(value.warehouse === ''){
                return res.json({
                    error : 'Warehouse is required!'
                });
            }

            const usersID = req.body.storeid;

            Users.findByIdAndUpdate(usersID, {
                adminId : user.userdata._id,
                fullname : value.fullname.toString(),
                useremail : value.email.toString(),
                username : value.username.toString(),
                accounttype: value.password.toString(),
                warehouse: value.warehouse.toString(),
                role: value.role.toString(),
                companyname : '',
                companyemail: '',
                companyphone: '',
                companylocation: '',
                adminemail: '',
                adminphone: '',
                password: passcode,
                       })
                      .then((result) => {
                          return res.json({
                            success : 'User Updated Successfully!' + value.email.toString()
                          })
                        })
                      .catch((err) => {
                        return res.json({
                            error : err
                        })
                        })

                    })
    

    }catch(error){
        res.json({
            error : error
        })
    }
}

const addsupplier = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (error, user) => {
            if (error) throw error;
            const adminId = user.userdata._id;

            const supp_liers = Suppliers({
                adminId : adminId,
                name : req.body.supplier.name.toString(),
                email : req.body.supplier.email.toString(),
                company: req.body.supplier.company.toString(),
                phone : req.body.supplier.phone.toString(),
                location : req.body.supplier.location.toString()
            })

            supp_liers.save()
                      .then((result) => {
                        return res.json({
                            success : 'Supplier successfully Added'
                        })
                      })
                      .catch((error) => {
                        return res.json({
                            error : error
                        })
                      })

        })

    }catch(error){
        return res.json({
            error: error
        })
    }
}

const getsuppliers = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {

            if (err) throw err;

            var adminId = user.userdata._id;

            Suppliers.find({adminId: adminId})
                     .then((result) => {
                        return res.json(result)
                     })
                     .catch(err =>{ 
                        return res.json({error : err})
                     })

        })

    }catch(error){
        return res.json({
            error : error
        })
    }
}

const editsupplier = async(req,res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (error, user) => {
            if (error) throw error;
            const adminId = user.userdata._id;
            const supId = req.body.storeid;

        Suppliers.findByIdAndUpdate(supId, {
                adminId : adminId,
                name : req.body.supplier.name.toString(),
                email : req.body.supplier.email.toString(),
                company: req.body.supplier.company.toString(),
                phone : req.body.supplier.phone.toString(),
                location : req.body.supplier.location.toString()
                })
                .then((result) => {
                    return res.json({
                        success : 'Successfully updated supplier' + req.body.supplier.name.toString()
                    })
                })
                .catch((error) => {
                    return res.json({
                        error : error
                    })
                })

        })


    }catch(error){
        return res.json({
            error : error
        })
    }
}

const deletesupplier = async (req, res) => {
    try{

       const {token} = req.cookies;
       
       jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        
        const supID = req.body.deleting;

        Suppliers.findByIdAndDelete(supID)
                 .then((result) => {
                    return res.json({
                        success : 'deleted successfully!'
                    })
                 })
                 .catch((error) => {
                    return res.json({
                        error : error
                    })
                 })
        
       })

    }catch(error){
        return res.json({
            error : error
        })
    }
}

const addcategory = async(req, res) => {
    try{

        console.log(req.body)

        const {token} = req.cookies;

        if(req.body.categorys.categoryname === ''){
            return res.json({
                error : 'Product category name is required'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;

            const adminId = user.userdata._id;

            const cate_gory = Categories({
                adminId : adminId,
                categoryname : req.body.categorys.categoryname.toString()
            })

            cate_gory.save()
                     .then((result) => {
                        return res.json({
                            success : 'New Category Added!'
                        })
                     })
                     .catch(err => {
                        console.log('ERROR' + err.message)
                        return res.json({
                            error : err
                        })
                     })

        })

    }catch(error){
        console.log('ERRORs' + error.message)
        return res.json({
            error : error
        })
    }
}

const getcategories = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;

            const adminId = user.userdata._id;

            Categories.find({
                      $or : [
                         {adminId : adminId},
                         {adminId : user.userdata.adminId} 
                          ] 
                          })
                      .then((result) => {
                        res.json(result)
                      })
                      .catch(err => {
                        return res.json({
                            error : err
                        })
                      })

        })

    }catch(error){
        return res.json({
            error : error
        })
    }
}

const deletecategory = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {

            const dltId = req.body.deleting;

            Categories.findByIdAndDelete(dltId)
                      .then((result) => {
                         return res.json({
                            success : 'Deleted Successfully'
                         })
                      })
                      .catch((err) => {
                         return res.json({
                            error : err
                         })
                      })

        })

    }catch(error){
        return res.json({
            error : error
        })
    }
}

const addproduct = async (req, res) => {
    try{

        const {token} = req.cookies;

        const val = req.body.products;
        console.log(val)

        if(val.batchno === ''){
            return res.json({
                error : 'Batch Number is required'
            })
        }

        if(val.name === ''){
            return res.json({
                error : 'Product name is required'
            })
        }

        if(val.description === ''){
            return res.json({
                error : 'Product description is required'
            })
        }

        if(val.costprice === ''){
            return res.json({
                error : 'Cst Price is required'
            })
        }

        if(val.sellingprice === ''){
            return res.json({
                error : 'Selling Price is required'
            })
        }

        if(val.quantity === ''){
            return res.json({
                error : 'Qunatity is required'
            })
        }

        if(val.warehouse === ''){
            return res.json({
                error : 'Select warehouse'
            })
        }

        if(val.categories === ''){
            return res.json({
                error : 'Product category is required'
            })
        }

        if(val.supplier === ''){
            return res.json({
                error : 'Select supplier'
            })
        }

        if(val.mandate === ''){
            return res.json({
                error : 'Manufactury date is required'
            })
        }

        if(val.expdate === ''){
            return res.json({
                error : 'Expiry Date is required'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminId = user.userdata._id;

            const pro_duct = Products({
                adminId : adminId,
                name : req.body.products.name.toString(),
                batchno : req.body.products.batchno.toString(),
                description : req.body.products.description.toString(),
                costprice : req.body.products.costprice.toString(),
                sellingprice : req.body.products.sellingprice.toString(),
                quantity : req.body.products.quantity.toString(),
                categories : req.body.products.categories.toString(),
                warehouse: req.body.products.warehouse.toString(),
                supplier : req.body.products.supplier.toString(),
                mandate : req.body.products.mandate.toString(),
                expdate : req.body.products.expdate.toString()
            })

            pro_duct.save()
                    .then((result) => {
                        return res.json({
                            success : 'Product Added Successfully!'
                        })
                    })
                    .catch((error) => {
                        console.log('errorw' + error)
                        return res.json({
                            error : error
                        })
                    })

        })

    }catch(error){
        console.log('Eroe' + error)
        return res.json({
            error : error
        })
    }
}

const editproduct = async (req, res) => {
    try {

        const {token} = req.cookies;

        const val = req.body.products;

        if(val.batchno === ''){
            return res.json({
                error : 'Batch Number is required'
            })
        }

        if(val.name === ''){
            return res.json({
                error : 'Product name is required'
            })
        }

        if(val.description === ''){
            return res.json({
                error : 'Product description is required'
            })
        }

        if(val.costprice === ''){
            return res.json({
                error : 'Cst Price is required'
            })
        }

        if(val.sellingprice === ''){
            return res.json({
                error : 'Selling Price is required'
            })
        }

        if(val.quantity === ''){
            return res.json({
                error : 'Qunatity is required'
            })
        }

        if(val.warehouse === ''){
            return res.json({
                error : 'Select warehouse'
            })
        }

        if(val.categories === ''){
            return res.json({
                error : 'Product category is required'
            })
        }

        if(val.supplier === ''){
            return res.json({
                error : 'Select supplier'
            })
        }

        if(val.mandate === ''){
            return res.json({
                error : 'Manufactury date is required'
            })
        }

        if(val.expdate === ''){
            return res.json({
                error : 'Expiry Date is required'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminId = user.userdata._id;
            const prodId = req.body.products._id;

            Products.findByIdAndUpdate(prodId, {
                name : req.body.products.name.toString(),
                batchno : req.body.products.batchno.toString(),
                description : req.body.products.description.toString(),
                costprice : req.body.products.costprice.toString(),
                sellingprice : req.body.products.sellingprice.toString(),
                quantity : req.body.products.quantity.toString(),
                categories : req.body.products.categories.toString(),
                warehouse: req.body.products.warehouse.toString(),
                supplier : req.body.products.supplier.toString(),
                mandate : req.body.products.mandate.toString(),
                expdate : req.body.products.expdate.toString()
                                       })
                    .then((result) => {
                        return res.json({
                            success : 'Product Updated Successfully!'
                        })
                    })
                    .catch((error) => {
                        return res.json({
                            error : error
                        })
                    })

        })

    }catch(error){
        return res.json({
            error : error
        })
    }
}

const getproducts = async (req ,res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminId = user.userdata._id;

            Products.find({
                 $or : [
                         {adminId : adminId},
                         {adminId : user.userdata.adminId}
                       ]
                          })
                    .then((result) => {
                        return res.json(result)
                    })
                    .catch((error) => {
                       return  res.json({
                            error : error
                        })
                    })

        })

    }catch(error){
       return res.json({
        error : error
       })
    }
}

const deleteproduct = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const prodID  = req.body.deleting;

            Products.findByIdAndDelete(prodID)
                    .then((result) => {
                        return res.json({
                            success : 'Successfully Deleted!'
                        })
                    })
                    .catch(error => {
                        return res.json({
                            error : error
                        })
                    })

        })

    }catch(error){
        return res.json({
            error : error
        })
    }
}

const adminlogout = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {expiresIn : new Date(0)}, (err, user) => {
            res.clearCookie('token')
             console.log(user)
             return res.json({
                user : user,
                success: 'Successfully logout'
             })
           })

    }catch(error){
        console.log(error)
        return res.json({
            error : error
        })
    }
}

const addcart = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const prodID = req.body.isselected;
            const staffID  = user.userdata._id;
            console.log(prodID)

            Products.find({
                    _id : prodID
                     })
                    .then((result) => {
                        console.log(result.sellingprice)
                        const rows_data = rows({
                            staffId : staffID,
                            item : result
                        })

                        rows_data.save()
                                 .then((results) => {
                                    console.log('SUCCESS')
                                    return res.json({
                                        success : 'Success'
                                    })
                                 })
                                 .catch((error) => {
                                    console.log(error)
                                 })
                    })
                    .catch(error => {
                        return res.json({
                            error : error
                        })
                    })

        })

    }catch(error){
        return res.json({
            error : error
        })
    }
}

const getcart = async(req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const staffID = user.userdata._id;

            rows.find({
                 staffId : staffID
                     })
                .then((result) => {
                    return res.json(result)
                     })
                .catch((ers) =>{
                    return res.json({
                        error : ers
                    })
                    })

        })

    }catch(err){
        return res.json({
            error : err
        })
    }
}

module.exports = {
    signup,
    preview,
    login,
    getProfile,
    store,
    storeData,
    editStore, 
    deletestore,
    adduser,
    users,
    deleteuser,
    edituser,
    addsupplier,
    getsuppliers,
    editsupplier,
    deletesupplier,
    addcategory,
    getcategories,
    deletecategory,
    addproduct,
    getproducts,
    editproduct, 
    deleteproduct,
    adminlogout,
    addcart,
    getcart
}