const Users = require('../models/signupModel')
const {hashPassword, comparePassword} = require('../configs/passwordauth')
const jwt = require('jsonwebtoken')
const Store = require('../models/storeModel')
const Suppliers = require('../models/supplierModel')
const Categories = require('../models/categoryModel')
const Products = require('../models/productModel')
const rows = require('../models/rowModel')
const invoices = require('../models/invoiceModel')
const Setting = require('../models/settingsModel')
const notifications = require('../models/notificationsModel')

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
                accounttype: value.role.toString(),
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
        
        if(req.body.srcUrl === '' || req.body.srcUrl === null){
            res.json({
                error : "Product's Image Required."
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

        if(req.body.mandate === ''){
            return res.json({
                error : 'Manufactury date is required'
            })
        }

        if(val.date === ''){
            return res.json({
                error : 'Expiry Date is required'
            })
        }

        if(val.month === ''){
            return res.json({
                error : 'Expiry Month is required'
            })
        }

        if(val.year === ''){
            return res.json({
                error : 'Expiry Year is required'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminId = user.userdata._id;

            const pro_duct = Products({
                adminId : adminId,
                prd_img : req.body.srcUrl,
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
                edate : req.body.products.date.toString(),
                emonth : req.body.products.month.toString(),
                eyear : req.body.products.year.toString()
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

        if(req.body.srcUrl === '' || req.body.srcUrl === null){
            res.json({
                error : "Product's Image Required."
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

        if(req.body.mandate === ''){
            return res.json({
                error : 'Manufactury date is required'
            })
        }

        if(val.date === ''){
            return res.json({
                error : 'Expiry Date is required'
            })
        }

        if(val.month === ''){
            return res.json({
                error : 'Expiry Month is required'
            })
        }

        if(val.year === ''){
            return res.json({
                error : 'Expiry Year is required'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminId = user.userdata._id;
            const prodId = req.body.storeid;

            Products.findByIdAndUpdate(prodId, {
                prd_img : req.body.srcUrl,
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
                edate : req.body.products.date.toString(),
                emonth : req.body.products.month.toString(),
                eyear : req.body.products.year.toString()
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

const previewProduct = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const preId = req.body.previewId;

            Products.findById(preId)
                    .then((result) => {
                        return res.json(result);
                     })
                    .catch((erre) => {
                        return res.json({
                            error : erre
                        })
                    })

        })

    }catch(errs){
        return res.json({
            error : errs
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
            var ID = user.userdata._id;
            var tme = req.body.thee_time;
            var dte = req.body.thee_date;

            Users.findByIdAndUpdate(ID, {time : tme, date : dte})
                 .then((result) => {
                    res.clearCookie('token');
                    console.log(user)
                    return res.json({
                       user : user,
                       success : 'success'
                    })
                  })
                 .catch(err => {
                    return res.json({
                        error : err
                    })
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
        const prodID = req.body.isselected;
        console.log(prodID)
        const {token} = req.cookies;
        
        if(prodID === ''){
            return res.json({
                error : "No product selected!"
            })
        }

        const prod_row = await rows.find({productId : prodID});

        if(prod_row.length > 0){
            return res.json({
                        error : "Product already added to cart. Edit the quantity!"
                           })
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const staffID  = user.userdata._id;
               
            Products.find({
                    _id : prodID
                     })
                    .then((result) => {
                        const rows_data = rows({
                            staffId : staffID,
                            item : result,
                            productId : prodID
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

const deleteone = async(req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const itemID = req.body.itemId;
            rows.findByIdAndDelete(itemID)
                .then((result) => {
                    return res.json({
                        success : 'success'
                    })
                })
                .catch((error) => {
                    return res.json({
                        error : error
                    })
                })  

        })

    }catch(err){
        return res.json({
            error : err
        })  
    }
}

const deletemany = async(req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            
            const staffID = user.userdata._id;
            rows.deleteMany({staffId : staffID})
                .then((result) => {
                    return res.json({
                        success : 'success'
                    })
                })
                .catch((error) => {
                    return res.json({
                        error : error
                    })
                })  

        })

    }catch(err){
        return res.json({
            error : err
        })  
    }
}

const invoice = async (req, res) => {
    try{

        const {token} = req.cookies;  
        
        if(req.body.isInvoice.payment === ''){
            return res.json({
                error : 'Payment Method is required'
            })
        }

        if(!req.body.info.length){
            return res.json({
                error : 'No item was selected!'
            })  
        }

        var random = 1000000;

        var mathran = Math.floor(Math.random() * random);

        var statuses = '';

        if(req.body.isInvoice.paid.toString() !== req.body.amount){
            statuses = 'Partially Paid';
        }else{
            statuses = 'Fully Paid';
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {

            const staffID = user.userdata._id;
            const staffName = user.userdata.username;
            const adminID = user.userdata.adminId;
            
            const inv_oice = invoices({
                invoiceno : mathran,
                staffId : staffID,
                adminId : adminID,
                staffname : staffName,
                customername : req.body.isInvoice.customername.toString(),
                customeremail : req.body.isInvoice.customeremail.toString(),
                customerphone: req.body.isInvoice.customerphone.toString(),
                grandtotal : req.body.grandtotal,
                totalamount: req.body.amount,
                discount: req.body.isDiscount,
                method : req.body.isInvoice.payment.toString(),
                item: req.body.info,
                status : statuses,
                paid : req.body.isInvoice.paid.toString(),
                date : req.body.thee_date,
                time : req.body.thee_time,
                month : req.body.month,
                year : req.body.year
            })
            
            inv_oice.save()
                    .then((resultes) => {

                        rows.deleteMany({staffId : staffID})
                            .then((result) => {
                               console.log('deleted')
                            })
                            .catch(error => {
                                return res.json({
                                    error : error
                                })
                            })

                                
                                Products.find({
                                          adminId: adminID
                                             })
                                        .then((answer) => {
                                        
                                            var decode = req.body.info;
                                            decode.forEach(dec => {

                                                answer.forEach(ans => {
                                                    const prodname = ans.name;
                                                    const prodqty = ans.quantity;
                                                   
                                                    const product_name = dec.Item;
                                                    const product_quantity = dec.Quantity;

                                                    
                                                    if(prodname === product_name){
                                                        var remainder = prodqty - product_quantity;
                                                       
                                                        Products.findOneAndUpdate({name : product_name},{$set : {quantity : remainder}})
                                                                .then((updat) => {
                                                            console.log('found and updated successfully')
                    
                                                                 })
                                                                .catch((erss) => {
                                                            console.log(erss)
                                                                 })

                                                       }       

                                                })  
                                            })

                                        })
                                        .then((ers) => {
                                            console.log(ers)
                                        })
               
                                        return res.json({
                                            success : resultes
                                        })

                    })
                    .catch((errors) => {
                        console.log(errors) 
                        return res.json({
                            error : errors
                        })
                    })
            
        }) 

    }catch(err){
        console.log('My ERROR ' + err)
        return res.json({
            error : err
        })
    }
}

const getinvoice = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            
            var staffID = user.userdata._id;

             invoices.find({
                staffId: staffID
                          }).sort({createdAt : -1})
                     .then((result) => {
                        return res.json(result)
                          })
                     .catch((errors) => {
                        return res.json({
                            error: errors
                          })
                          })
        }) 

    }catch(err){
        return res.json({
            error : err
        })
    }
}

const receipts = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const receiptID = req.body.receiptId;
            
            invoices.find({_id : receiptID})
                    .then((result) => {
                        return res.json(result)
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

const userreports = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token , process.env.JWT_SECRET, {}, (err, user) => {
            const staffID = user.userdata._id;

            invoices.find({
                      staffId : staffID
                       }).sort({createdAt : -1})
                    .then((result) => {
                        return res.json(result)
                    })
                    .catch((error) => {
                        return res.json({
                            error : error
                        })
                    })

        })

    }catch(err){
        return res.json({
            error : err
        })
    }
}

const cashreport = async (req, res) => {
   try {

    const {token} = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        const staffID = user.userdata._id;
        
        invoices.find({
                 staffId : staffID,
                 method: 'cash'
                    })
                .then((result) => {
       
                        return res.json(result)

                })
                .catch((eror) => { 
                    return res.json({
                        error : eror
                    })
                })

    })

   }catch(error){
    return res.json({
        error : error
    })
   }
}

const transferReport = async(req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token , process.env.JWT_SECRET, {}, (err, user) => {
            const staffID = user.userdata._id;

            invoices.find({
                      staffId : staffID,
                      method: 'transfer'
                       })
                    .then((result) => {
                        return res.json(result)
                    })
                    .catch((error) => {
                        return res.json({
                            error : error
                        })
                    })

        })

    }catch(err){
        return res.json({
            error : err
        })
    }
}

const chequereport = async(req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token , process.env.JWT_SECRET, {}, (err, user) => {
            const staffID = user.userdata._id;

            invoices.find({
                      staffId : staffID,
                      method: 'cheque'
                       })
                    .then((result) => {
                        return res.json(result)
                    })
                    .catch((error) => {
                        return res.json({
                            error : error
                        })
                    })

        })

    }catch(err){
        return res.json({
            error : err
        })
    }
}

const userCreditors = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token , process.env.JWT_SECRET, {}, (err, user) => {
            const staffID = user.userdata._id;

            invoices.find({
                      staffId : staffID
                       }).sort({createdAt : -1})
                    .then((result) => {
                        return res.json(result)
                    })
                    .catch((error) => {
                        return res.json({
                            error : error
                        })
                    })

        })

    }catch(err){
        return res.json({
            error : err
        })
    }
}

const userbalance = async(req,res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const bal_id = req.body.balId;
            const bal_ance = req.body.isblc.balance.toString();

            invoices.findById({
                            _id : bal_id
                         })
                    .then((results) => {
                        
                        var bal = Math.floor(bal_ance);
                        var pp = Math.floor(results.paid);
                        var pa_id = Math.floor(pp + bal);
                        console.log(pa_id);

                        var amnt = Math.floor(results.totalamount);
                        
                        var refer = Math.floor(pp + bal);
                        console.log(refer);

                        if(refer < amnt || refer === amnt){
                            var statuses = '';
                            if(refer < amnt){
                                statuses = 'Partially Paid'
                            }
                            if(refer === amnt){
                                 statuses = 'Fully Paid'
                            }

                invoices.findByIdAndUpdate(bal_id,{paid : pa_id, status : statuses})
                        .then((result) => {
                            return res.json({
                                success : 'success'
                            })
                            console.log('Paid')                    
                         })
                        .catch((error) => {
                            return res.json({
                                error : error
                            })
                         })

                        }else{
                            return res.json({
                                error : 'Invalid Amount!!'
                            })
                        }

                    })
                    .catch((error) => {
                        return res.json({
                            error : error
                        })
                    })


        })

    }catch(errors){
        return res.json({
            error : errors
        })
    }
}

const userlogout = async(req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {expiresIn : new Date(0)}, (err, user) => {

            var IDs = user.userdata._id;
            var tme = req.body.thee_time;
            var dte = req.body.thee_date;

            Users.findByIdAndUpdate(IDs, {time : tme, date : dte})
                 .then((result) => {
                    res.clearCookie('token');
                    console.log(user)
                    return res.json({
                       user : user,
                       success: 'success'
                    })
                  })
                 .catch(err => {
                    return res.json({
                        error : err
                    })
                  })

        })

    }catch(error){
        console.log(error)
        return res.json({
            error : error
        })
    }
}

const todaysale = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const staffID = user.userdata._id;
            console.log(req.body.thee_date)
            invoices.find({
                     $and : [
                        { staffId : staffID },
                        { date : req.body.thee_date }
                            ]})
                    .then((result) => {
                        return res.json(result)
                     })
                    .catch((err) => {
                        return res.json({
                            error : err
                        })
                    })
        })

    }catch(err){
        return res.json({
            error: err
        })
    }
}

const monthsale = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const staffID = user.userdata._id;
            console.log(req.body.month)
            invoices.find({
                     $and : [
                        { staffId : staffID },
                        { month : req.body.month }
                            ]})
                    .then((result) => {
                        return res.json(result)
                     })
                    .catch((err) => {
                        return res.json({
                            error : err
                        })
                    })
        })

    }catch(err){
        return res.json({
            error: err
        })
    }
}

const yearsale = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const staffID = user.userdata._id;
            console.log(req.body.year)
            invoices.find({
                     $and : [
                        { staffId : staffID },
                        { year : req.body.year}
                            ]})
                    .then((result) => {

                        return res.json(result)
                     })
                    .catch((err) => {
                        return res.json({
                            error : err
                        })
                    })
        })

    }catch(err){
        return res.json({
            error: err
        })
    }
}

const todaySales = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID = user.userdata._id;
            console.log(req.body.thee_date)
            invoices.find({
                     $and : [
                        { adminId : adminID },
                        { date : req.body.thee_date }
                            ]})
                    .then((result) => {
                        return res.json(result)
                     })
                    .catch((err) => {
                        return res.json({
                            error : err
                        })
                    })
        })

    }catch(err){
        return res.json({
            error: err
        })
    }
}

const todayInvoices = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID = user.userdata._id;

            invoices.find({
              $and : [
                        {adminId : adminID},
                        {date : req.body.thee_date}
                     ]
                     })
                    .then((result) => {
                        return res.json(result)
                    })
                    .catch((err) => {
                        return res.json({
                            error : err
                        })
                    })

        })

    }catch(err){
        return res.json({
            error : err
        })
    }
}

const totalinvoices = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            
            var adminID = user.userdata._id;

             invoices.find({adminId: adminID}).sort({createdAt : -1})
                     .then((result) => {
                        return res.json(result)
                          })
                     .catch((errors) => {
                        return res.json({
                            error: errors
                          })
                          })
        }) 

    }catch(err){
        return res.json({
            error : err
        })
    }
}

const currentmonth = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID = user.userdata._id;

            invoices.find({
                     $and : [
                        { adminId : adminID },
                        { month : req.body.month }
                            ]})
                    .then((result) => {
                        return res.json(result)
                     })
                    .catch((err) => {
                        return res.json({
                            error : err
                        })
                    })
        })

    }catch(err){
        return res.json({
            error: err
        })
    }
}

const lastthreemonth = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID = user.userdata._id;

            const greater_than = req.body.month - 3;
            console.log(greater_than)

            invoices.find({
                    $and : [
                        { adminId : adminID },
                        { 
                        month : {
                            $gte : greater_than,
                            $lte : req.body.month
                                } 
                        }
                          ]
                        })
                    .then((result) => {
                        return res.json(result)
                     })
                    .catch((err) => {
                        return res.json({
                            error : err
                        })
                    })
        })

    }catch(err){
        return res.json({
            error: err
        })
    }
}

const lastsixmonth = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID = user.userdata._id;

            const greater_than = req.body.month - 6;
            console.log(greater_than)

            invoices.find({
                    $and : [
                        { adminId : adminID },
                        { 
                        month : {
                            $gte : greater_than,
                            $lte : req.body.month
                                } 
                        }
                          ]
                        })
                    .then((result) => {
                        return res.json(result)
                     })
                    .catch((err) => {
                        return res.json({
                            error : err
                        })
                    })
        })

    }catch(err){
        return res.json({
            error: err
        })
    }
}

const lastyearsales = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID = user.userdata._id;

            const last_year = req.body.year - 1;
            

            invoices.find({
                    $and : [
                        { adminId : adminID },
                        { year : last_year }
                          ]
                        })
                    .then((result) => {
                        return res.json(result)
                     })
                    .catch((err) => {
                        return res.json({
                            error : err
                        })
                    })
        })

    }catch(err){
        return res.json({
            error: err
        })
    }
}

const currentyearsales = async (req, res) => {
    try{

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID = user.userdata._id;

            invoices.find({
                    $and : [
                        { adminId : adminID },
                        { year : req.body.year }
                          ]
                        })
                    .then((result) => {
                        return res.json(result)
                     })
                    .catch((err) => {
                        return res.json({
                            error : err
                        })
                    })
        })

    }catch(err){
        return res.json({
            error: err
        })
    }
}

const allreceipts = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const receiptID = req.body.isreceiptId;

            invoices.findByIdAndDelete(receiptID)
                    .then((result) => {
                        return res.json({
                            success: 'success',
                            adminid : user.userdata.adminId
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

const allcashreport = async (req, res) => {
    try {
 
     const {token} = req.cookies;
 
     jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
         const adminID = user.userdata._id;
         
         invoices.find({
                  adminId : adminID,
                  method: 'cash'
                     })
                 .then((result) => {      
                         return res.json(result)
                 })
                 .catch((eror) => { 
                     return res.json({
                         error : eror
                     })
                 })
 
     })
 
    }catch(error){
     return res.json({
         error : error
     })
    }
 }
 
 const alltransferReport = async(req, res) => {
     try {
 
         const {token} = req.cookies;
 
         jwt.verify(token , process.env.JWT_SECRET, {}, (err, user) => {
             const adminID = user.userdata._id;
 
             invoices.find({
                       adminId : adminID,
                       method: 'transfer'
                        })
                     .then((result) => {
                         return res.json(result)
                     })
                     .catch((error) => {
                         return res.json({
                             error : error
                         })
                     })
 
         })
 
     }catch(err){
         return res.json({
             error : err
         })
     }
 }
 
 const allchequereport = async(req, res) => {
     try {
 
         const {token} = req.cookies;
 
         jwt.verify(token , process.env.JWT_SECRET, {}, (err, user) => {
             const adminID = user.userdata._id;
 
             invoices.find({
                       adminId : adminID,
                       method: 'cheque'
                        })
                     .then((result) => {
                         return res.json(result)
                     })
                     .catch((error) => {
                         return res.json({
                             error : error
                         })
                     })
 
         })
 
     }catch(err){
         return res.json({
             error : err
         })
     }
 }
 
 const allPOSreport = async(req, res) => {
     try {
 
         const {token} = req.cookies;
 
         jwt.verify(token , process.env.JWT_SECRET, {}, (err, user) => {
             const adminID = user.userdata._id;
 
             invoices.find({
                       adminId : adminID,
                       method: 'POS'
                        })
                     .then((result) => {
                         return res.json(result)
                     })
                     .catch((error) => {
                         return res.json({
                             error : error
                         })
                     })
 
         })
 
     }catch(err){
         return res.json({
             error : err
         })
     }
 }

 const adminDetail = async (req, res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID = user.userdata.adminId;

            Users.find({_id : adminID})
                 .then((result) => {
                    return res.json(result)
                 })
                 .catch(err => {
                    return res.json({
                        error : err
                    })
                 })
        })

    }catch(err){
        return res.json({
            error : err
        })
    }
 }

 const advanceSettings = async (req, res) => {
    try {
       
        const {token} = req.cookies;
     
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminId = user.userdata._id;

            //update settings if exist
            const exi_st = Setting.findOne({adminId : adminId})
                                  .then((resultss) => {
                                    if(resultss !== null){
                                        Setting.findOneAndUpdate({adminId : adminId}, {
                                            adminId : adminId,
                                            minimumqty : req.body.advanceChange.minimumqty.toString(),
                                            minimumqty : req.body.advanceChange.minimumqty.toString(),
                                            targetamt : req.body.advanceChange.targetamt.toString(),
                                            date : req.body.advanceChange.date.toString(),
                                            month : req.body.advanceChange.month.toString(),
                                            year : req.body.advanceChange.year.toString(),
                                            toggle: req.body.istoggled, 
                                                     })
                                                   .then((resu) => {
                                                        return res.json({
                                                                success : 'Successfully updated settings'
                                                                       })  
                                                     })
                                                   .catch((errr) => {
                                                       return res.json({
                                                                   error : errr
                                                    })
                                                    })
                                    }else{
                                        const set_ings = Setting({
                                            adminId : adminId,
                                            minimumqty : req.body.advanceChange.minimumqty.toString(),
                                            minimumqty : req.body.advanceChange.minimumqty.toString(),
                                            targetamt : req.body.advanceChange.targetamt.toString(),
                                            date : req.body.advanceChange.date.toString(),
                                            month : req.body.advanceChange.month.toString(),
                                            year : req.body.advanceChange.year.toString(),
                                            toggle : req.body.istoggled,
                                                                      })
                            
                                              set_ings.save()
                                                      .then((result) => {
                                                    
                                                    return res.json({
                                                        success : 'Settings has been changed!'
                                                    })
                                                       })
                                                      .catch((err) => {
                                                    console.log(err)
                                                    return res.json({
                                                        error : err.message
                                                    })
                                                       })
                                    }
                                  })

        })

    }catch(err){
        return res.json({
            error : err
        })
    }
 }

 const setTings = async (req, res) => {
    try {         
        
        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID  = user.userdata._id;

            Setting.find({adminId : adminID})
                   .then((result) => {
                         return res.json(result)
                    })
                   .catch((errs) => {
                         return res.json({
                        error : errs
                                        })
                    })

        })

        }catch(err){
           return res.json({
            error : err
           })
        }
 }

 const notify = async (req, res) => {
    try {
        
        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID  = user.userdata._id;

      notifications.find({adminId : adminID}).sort({createdAt : -1})
                   .then((result) => {
                         return res.json(result)
                    })
                   .catch((errs) => {
                         return res.json({
                        error : errs.message
                                        })
                    })

        })  

    }catch(err){
        console.log(err.message)
    }
 }

 const markRead = async (req, res) => {
    try {
        
        const {token} = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            const adminID  = user.userdata._id;

      notifications.updateMany({adminId : adminID},{read : 'yes'})
                   .then((result) => {
                         return res.json({
                            success : 'All Marked as Read'
                         })
                    })
                   .catch((errs) => {
                         return res.json({
                        error : errs.message
                                        })
                    })

        })  

    }catch(err){
        console.log(err.message)
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
    getcart,
    deleteone,
    deletemany,
    invoice,
    getinvoice,
    receipts,
    previewProduct,
    userreports,
    cashreport,
    transferReport,
    chequereport,
    userCreditors,
    userbalance,
    userlogout,
    todaysale,
    monthsale,
    yearsale,
    todaySales,
    todayInvoices,
    totalinvoices,
    currentmonth,
    lastthreemonth,
    lastsixmonth,
    lastyearsales,
    currentyearsales,
    allreceipts,
    allcashreport,
    alltransferReport,
    allPOSreport,
    allchequereport,
    adminDetail,
    advanceSettings,
    setTings,
    notify,
    markRead
 } 