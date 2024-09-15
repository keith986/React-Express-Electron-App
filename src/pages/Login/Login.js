import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './../../context/userContext';
import { Link } from 'react-router-dom';


const Login = () => {

   const {user} = useContext(UserContext);
   const navigate = useNavigate();
   
   useEffect(() =>{
   if(!!user && user.accounttype === 'Admin'){
        navigate('/adminpage')
   }

   if(!!user && user.accounttype === 'staff'){
      navigate('/userpage')
   }

   if(!!user && !user){
      navigate('/login') 
   }
   }, [navigate, user])

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
                   var datas = result.data;
                
                   if(datas.error){
                        toast.error(datas.error);
                     }
                   if(datas.success){
                        setLogin({});
                        toast.success(datas.success);
                        if(datas.admin){
                          navigate('/adminpage');
                          setTimeout(() => {
                           window.location.reload();
                          }, 1000);
                        }
                        if(datas.staff){
                           navigate('/userpage');
                           setTimeout(() => {
                              window.location.reload();
                           }, 1000);
                        }
                     }
                })
               .catch(err => console.log(err.message))
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
        <button type='submit' className='generate' style={{color:'#fff'}}>Login</button>
    </div>
    <div className='row'>
       <Link to='signup' style={{textDecoration: 'none', color : '#000'}}>Click here to create an account</Link>
    </div>
    </div>
   
   </form>

  )
}

export default Login
