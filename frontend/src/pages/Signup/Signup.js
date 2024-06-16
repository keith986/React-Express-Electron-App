import React, { useState } from 'react'

const Login = () => {

    const [isNext, setIsNext] = useState(false)
    const [isBack, setIsBack] = useState(false)

    const nextClick = async() => {
        setIsNext(true)
        setIsBack(false)
    }

    const backClick = async() => {
        setIsBack(true)
        setIsNext(false)
    }

  return (
    <div className="container">
    <div className={`pageone ${isBack ? "backone" : ""}`} id={`${isNext ? "opentwo" : ""}`}>
    <h1>COMPANY SETUP</h1>
    <br/>
    <div className='row'>
    <h4>Company Name:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input'/>
    </div>
    <br/>
    <div className='row'>
    <h4>Email:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input'/>
    </div>
    <br/>
    <div className='row'>
    <h4>Phone:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input'/>
    </div>
    <br/>
    <div className='row'>
    <h4>Location:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input'/>
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
       <input type='text' className='names-input'/>
    </div>
    <div className='row'>
    <h4>Email:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input'/>
    </div>
    
    <div className='row'>
    <h4>Phone:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input'/>
    </div>
 
    <div className='row'>
    <h4>Username:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input'/>
    </div>
    
    <h4>Password</h4>
    <div className="row">
       <input type='text' className='names-input'/>
    </div>
   <br/>
        <button type='button' className='generate' id='gen' onClick={backClick}>Back</button>
    <br/>
    <br/>
        <button type='button' className='generate'>Submit</button>
</div>

</div>
  )
}

export default Login
