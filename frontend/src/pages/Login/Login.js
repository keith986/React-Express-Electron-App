import React from 'react'

const Login = () => {
  return (
    <div className="container">
    <h1>Login Back!</h1>
    <i className='bi bi-person-circle'></i>
    <br/>
    <br/>
    <br/>
    <div className='row'>
    <h4>Username:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input'/>
    </div>
    <br/>
    <br/>
    <br/>
    <div className='row'>
    <h4>Password:</h4>
    </div>
    <div className="row">
       <input type='text' className='names-input'/>
    </div>
    <br/>
    <br/>
    <br/>
    <div className='row'>
        <button type='button' className='generate'>Login</button>
    </div>
</div>
  )
}

export default Login
