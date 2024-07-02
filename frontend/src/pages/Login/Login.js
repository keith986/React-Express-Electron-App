import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {

   const navigate = useNavigate();

   const [login, setLogin] = useState({
      username: '',
      password: ''
   })

   const handleChange = async(event) => {
      setLogin({...login, [event.target.name]:[event.target.value]})
   }

  const submitChange = async(e) => {
    e.preventDefault()
    await axios.post('/login', {login})
               .then((result) => {
                     console.log(result)
                   var datas = result.data;
                   //  console.log(datas.error)
                   if(datas.error){
                        toast.error(datas.error);
                     }
                     if(datas.success){
                        setLogin({})
                        toast.success(datas.success);
                        if(datas.admin){
                        navigate('/adminpage')
                        }
                        if(datas.staff){
                           navigate('/userpage')
                        }
                     }
               })
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
       <input type='text' className='names-input' name='username' onChange={handleChange}/>
    </div>
    <br/>
    <br/>
    <br/>
    <div className='row'>
    <h4>Password:</h4>
    </div>
    <div className="row">
       <input type='password' className='names-input' name='password' onChange={handleChange}/>
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
