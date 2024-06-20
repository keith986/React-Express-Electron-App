import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast';

const Signup = () => {

  const navigate = useNavigate();


    const [isNext, setIsNext] = useState(false)
    const [isBack, setIsBack] = useState(false)
    const [isValue, setIsValue] = useState({
      companyname : '',
      companyemail: '',
      companyphone: '',
      companylocation: '',
      fullname: '',
      adminusername: '',
      adminemail:  '',
      adminphone: '',
      adminpassword: ''                 
                                          })

    const nextClick = async() => {
        setIsNext(true)
        setIsBack(false)
    }

    const backClick = async() => {
        setIsBack(true)
        setIsNext(false)
    }

    const handleChange = async(event) => {
      setIsValue({...isValue , [event.target.name]:[event.target.value]})
    }

    const submitChange = async(e) => {
      e.preventDefault(); 
      try{

          await axios.post('/signup', {isValue})
                     .then((result) => {
                      //  console.log(result)
                        var datas = result.data;
                      //  console.log(datas.error)
                      if(datas.error){
                           toast.error(datas.error);
                        }
                        if(datas.success){
                           setIsValue({})
                           toast.success('successfully signed up!');
                           navigate('/login')
                        }
                        
                     })
                     .catch(err => toast.error(err))

        
      }catch(error){
         toast.error(error.message)
         console.log(error.message)
      }
          
    }

  return (
    <div className="container">
    <form onSubmit={submitChange}>
    <div className={`pageone ${isBack ? "backone" : ""}`} id={`${isNext ? "opentwo" : ""}`} >
    <h1>COMPANY SETUP</h1>
    <br/>
    <div className='row'>
    <h4>Company Name:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input' name='companyname' onChange={handleChange} />
    </div>
    <br/>
    <div className='row'>
    <h4>Email:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input' name='companyemail' onChange={handleChange} />
    </div>
    <br/>
    <div className='row'>
    <h4>Phone:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input' name='companyphone' onChange={handleChange} />
    </div>
    <br/>
    <div className='row'>
    <h4>Location:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input' name='companylocation' onChange={handleChange} />
    </div>
    <br/>
    <div className='row'>
        <button type='button' className='generate' onClick={nextClick}>Continue</button>
    </div>
    </div>

<div className={`continue ${isBack ? "backto" : ""}`} id={`${isNext ? "cont" : ""}`}>
<h1>ADMIN ACCOUNT</h1>
    <br/>
    <div className='row'>
    <h4>FULL Name:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input' name='fullname' onChange={handleChange} />
    </div>
    <div className='row'>
    <h4>Email:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input' name='adminemail' onChange={handleChange} />
    </div>
    
    <div className='row'>
    <h4>Phone:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input' name='adminphone' onChange={handleChange} />
    </div>
 
    <div className='row'>
    <h4>Username:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input' name='adminusername' onChange={handleChange} />
    </div>
    
    <h4>Password</h4>
    <div className="row">
       <input type='text' className='names-input' name='adminpassword' onChange={handleChange} />
    </div>
   <br/>
        <button type='button' className='generate' id='gen' onClick={backClick}>Back</button>
    <br/>
    <br/>
        <button type='submit' className='generate'>Submit</button>
</div>
</form>
</div>
  )
}

export default Signup
