import React, {useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Activation = () => {
  const [iscode, setIsCode] = useState({
    theecode : '',
    theemail: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setIsCode({...iscode, [e.target.name]:[e.target.value]})
  }

  const resendCode = () => {
    axios.post('/activationcode', {iscode})
         .then((result) => {
           if(result.data.error){
             toast.error(result.data.error)
           }
           if(result.data.success){
              toast.success(result.data.success)
           }
          })
         .catch((errors) => {
            toast.error(errors.message)
          })
  }

  const handleActivation = () => {
    axios.post('/activated', {iscode})
         .then((result) => {
           if(result.data.error){
             toast.error(result.data.error);
           }
           if(result.data.success){
             toast.success('Your Account has been activated.')
             setTimeout(() => {
               navigate('/login');
             }, 1000)
           }
          })
         .catch((errs) => {
          toast.error(errs.message)
          })    
  }

  return (
     <div className='container'>
      <h1>ACTIVATE YOUR PRODUCT</h1>
      <div className='row' id='nms'>
        <h4 className='name'>Email Address : <i style={{fontSize: '14px'}}> * Hint: Enter your Admin Email Address *</i></h4>
      </div>
      <div className='row'>
        <input type='text' className='names-input' name='theemail' onChange={handleChange} placeholder='Enter your Email Address' style={{borderTop : "none", borderLeft: "none", borderRight: "none" , outline: "none", background: "transparent"}}/>
      </div>
      <div className='row'>
        <h4 className='name'>Activation Code</h4>
      </div>
      <div className='row'>
        <input type='text' className='names-input' placeholder='Activation code required...' name='theecode' onChange={handleChange}/> 
      </div>
      <span className='name' style={{marginTop: '40%'}}></span>
      <div className='row'>
       <button type='button' className='generate' style={{color: '#fff'}} onClick={handleActivation}>ACTIVATE NOW</button>
      </div>
      <div className='row'>
      <button type='button' className='generate' style={{color: '#fff', background: 'red'}} onClick={resendCode}>SEND CODE</button>
      </div>
    </div>
  )
}

export default Activation
