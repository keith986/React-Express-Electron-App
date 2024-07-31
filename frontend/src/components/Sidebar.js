import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery'
import { io } from "socket.io-client";
import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Sidebar = () => {

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

    if(!!user && user.accounttype !== 'Admin'){
    navigate('/login')
    }

    const [navbarCollapse, setNavCollapse] = useState(false);
    const [notify , setNotify] = useState('')

    const handleClick = () => {
      $('.notification-content').animate({
        width : "toggle"
      })
    }
     
    useEffect(() => {
      const socket = io('http://localhost:4000', {
        auth : {
          token : !!user && user._id
        }
      });
  
      socket.on('NewInvoice', (datas) => {
        if(!!user && user._id === datas.adminId){
          let msgs = `
          <div class='msg-data'>
                  <p className='msg-data'>
                   ${datas.staffname}, ${datas.msg}  
                  </p>
                  <p className='msg-data'>
                   invoice No. :: ${datas.invoiceno} 
                  </p>
                  <p className='msg-data'>
                   paid :: ${datas.paid} 
                  </p>
          </div>
                 `;
          $('#notes').prepend(msgs);

          addNotification({
            title: "Success",
            subtitle: "New Invoice",
            message: "Check out your inbox",
            theme: "light",
            closeButton: "X",
            backgroundTop: "green",
            backgroundBottom: "light",
          });
        }
      })

      return () => socket.off("NewInvoice");

    },[user]);

   setInterval(() => {
      var len = $('.msg-data').length;
      document.getElementById('notification-count').innerHTML = len;   
   }, 500);

  useEffect(() => {
    axios.post('/notify')
         .then((result) => {
          if(result.data.error){
            toast.error(result.data.error)
          }

          setNotify(result.data);

         })
         .catch((err) => {
          toast.error(err.message)
         })
  }, [user])

  const handleRead = async (req, res) => {
    try {
      
      axios.post('markasread')
           .then((result) => {
            if(result.data.error){
              toast.error(result.data.error)
            }

            if(result.data.success){
              toast.success(result.data.success)
            }

           })

    }catch(err) {
        toast.error(err.message)
    }
  }

  return (
    <div className={`container`}>
      <nav className='nav'>
      <div className='logo'>
      <h2>POStore</h2>
      <i className='bi bi-justify' onClick={e => setNavCollapse(!navbarCollapse)}></i>
      </div>
      
      <span>
      <i className='bi bi-bell-fill' style={{fontSize : '30px', cursor : 'pointer'}} onClick={handleClick}></i>
      <span id='notification-count'>0</span>
      </span>

      <div className='user-profile'>
      {!!user && (<h3>Hi {user.username}</h3>)}
      <span>{!!user && user.accounttype}</span>
      </div>
      </nav>
      <Notifications />
      <div className='sidebar-content'>
      <div className={`sidebar-container ${navbarCollapse ? "navbarCollaps" : " "}`}>
        <a href='/adminpage' className='nav-option option1'>
        <i className='bi bi-speedometer2'></i>
          <h3>Dashboard</h3>
        </a>
        <a href='/stores' className='nav-option option2'>
        <i className='bi bi-shop-window'></i>
          <h3>Store</h3>
        </a>
        <a href='/users' className='nav-option option3'>
        <i className='bi bi-people-fill'></i>
          <h3>Users</h3>
        </a>
        <a href='/suppliers' className='nav-option option4'>
        <i className='bi bi-truck'></i>
          <h3>Suppliers</h3>
        </a>
        <a href='/categories' className='nav-option option5'>
        <i className='bi bi-diagram-3-fill'></i>
          <h3>Categories</h3>
        </a>
        <a href='/products' className='nav-option option6'>
        <i className='bi bi-bag-fill'></i>
          <h3>Products</h3>
        </a>
        <a href='/orders' className='nav-option option7'>
        <i className='bi bi-list-task'></i>
          <h3>Orders</h3>
        </a>  
        <a href='/reports' className='nav-option option8'>
        <i className='bi bi-bar-chart-fill'></i>
          <h3>Reports</h3>
        </a>
        <a href='/creditors' className='nav-option option9'>
        <i className='bi bi-person-lines-fill'></i>
          <h3>Creditors</h3>
        </a>
        <a href='/expires' className='nav-option option10'>
        <i className='bi bi-slash-circle-fill'></i>
          <h3>Expired</h3>
        </a>
        <a href='/settings' className='nav-option option1'>
        <i className='bi bi-gear'></i>
          <h3>Settings</h3>
        </a>
      </div>
      </div>

      <div className='notification-content'>
        <i className='bi bi-x-lg' style={{fontSize : '25px', color : 'red'}}></i>
        <div className='note-content' id='notes'>
          {!!notify && notify.map((not) => {
            var clas = '';
            if(not.read === 'yes'){
               clas = 'msg-read';
            }

            if(not.read === 'no'){
              clas = 'msg-data';
            }

            return (
              <div className={clas}>
                  <p>
                   {not.staffname}, Generated Invoce
                  </p>
                  <p>
                   invoice No. :: {not.invoiceno} 
                  </p>
                  <p>
                   paid :: KES. {not.paid} 
                  </p>
              </div>
            );
          })}
        </div>
        <button id='mark-read' onClick={handleRead}>Mark All as Read</button>
      </div>

    </div>
  )
}

export default Sidebar
