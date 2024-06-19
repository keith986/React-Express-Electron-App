import axios from 'axios'
import React from 'react'

const Login = () => {

  const submitChange = async(e) => {
    e.preventDefault()
    await axios.get('/')
               .then(result => console.log(result))
               .catch(err => console.log(err))
  }

  return (
    <form onSubmit={submitChange}>
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
       <input type='text' className='names-input' name='username'/>
    </div>
    <br/>
    <br/>
    <br/>
    <div className='row'>
    <h4>Password:</h4>
    </div>
    <div className="row">
       <input type='password' className='names-input' name='password'/>
    </div>
    <br/>
    <br/>
    <br/>
    <div className='row'>
        <button type='submit' className='generate'>Login</button>
    </div>
</div>
   </form>
  )
}

export default Login
