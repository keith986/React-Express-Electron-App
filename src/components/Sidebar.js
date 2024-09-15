import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { UserContext } from '../context/userContext'
import { useNavigate, Link } from 'react-router-dom';
import $ from 'jquery'
import { io } from "socket.io-client";
import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useIdleTimer } from "react-idle-timer";

const Sidebar = () => {

    const {user} = useContext(UserContext);  
    const navigate = useNavigate();

    useEffect(() => {
    if(!!user && user.accounttype !== 'Admin'){
      navigate('/login')
    }
    }, [navigate, user])
  
    const [navbarCollapse, setNavCollapse] = useState(null);
    const [idleground, setIdleGround] = useState(null)
    const [notify , setNotify] = useState(null)
    const [ischeckin, setIsCheck] = useState(null)
    const [mini , setMini] = useState(null) 

  const handleClick = () => {
      $('.notification-content').animate({
        width : "toggle"
      },'slow')
  }
     
  useEffect(  () => {
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
      $('#notification-count').html(len);  
  }, 1000);

  useEffect( () => {
    axios.post('/notify')
         .then((result) => {
          if(result.data.error){
            toast.error(result.data.error)
          }else{
          setNotify(result.data);
          }
         })
         .catch((err) => {
          toast.error(err.message)
         })
  }, [user, notify])

  const handleRead = async (req, res) => {
    try {
      axios.post('markasread')
           .then((result) => {
            if(result.data.error){
              toast.error(result.data.error)
            }

            if(result.data.success){
              toast.success(result.data.success);

              var div_elem = document.getElementsByClassName('msg-data');
              $(div_elem).addClass('msg-read');
              $(div_elem).removeClass('msg-data');

            }

            })
           .catch((err) => {
             toast.error(err.message)
            })

    }catch(err) {
        toast.error(err.message)
    }
  }

  useEffect( () => {
    axios.post('/checkqty')
         .then((result) => {
               if(result.data.error){
                toast.error(result.data.error)
               }else{
                setIsCheck(result.data)
               }
          })
         .catch((errs) => {
             toast.error(errs.message)
          })
  }, [user, ischeckin])

  useEffect(() => {
    axios.post('/minimum')
         .then((result) => {           
            
             if(result.data.error){
               toast.error(result.data.error)
             }else{
              setMini(result.data)
             } 
          })
         .catch((err) => {
           toast.error(err.message)
          })

  }, [user, mini])

  var dates = new Date();
  var month =  dates.getMonth() + 1;
  var dat = dates.getDate();
  var year = dates.getFullYear();

  var min = dates.getMinutes();
  var hrs = dates.getHours();
  var sec = dates.getSeconds();
  var session = 'am';

  if(hrs >= 12){
      hrs = hrs - 12;
      session = 'pm';
  }

  if(min < 10){
      min  = '0' + min;
  }

  if(sec < 10){
      sec = '0' + sec;
  }

  var thee_date = dat + ' / ' + month + ' / ' + year;
  var thee_time = hrs + ' : ' + min + ' : ' + sec +  ' ' + session;

  const handleLogout = async () => {
    //var ids = user._id;
    axios.post('/adminlogout', {thee_date, thee_time})
         .then((result) => {
          console.log(result)
           if(result.data.success){
            navigate('/login')
            toast.success(result.data.success)
            window.location.reload()
           }
           if(result.data.error){
            toast.error(result.data.error)
           }
          })
         .catch(error => {
          toast.error(error)
          })
  }

  const FIVE_MINS = 30 * 60 * 1000;
	const GENERAL_DEBOUNCE_TIME = 10000;
  
	const handleOnUserIdle = async () => {
      setIdleGround(true)
	}
	
	useIdleTimer({
	  timeout: FIVE_MINS, 
	  onIdle: handleOnUserIdle,
	  debounce: GENERAL_DEBOUNCE_TIME, 
	});

  const handleClose = async () => {
    setIdleGround(false)
  }

  if(idleground === true){
    setTimeout(() => {
      //var ids = user._id;
    axios.post('/adminlogout', {thee_date, thee_time})
         .then((result) => {
           if(result.data.success){
            navigate('/login')
            toast.success(result.data.success)
            window.location.reload()
           }
           if(result.data.error){
            toast.error(result.data.error)
           }
          })
         .catch(error => {
          toast.error(error)
          })
    }, 60000);
  }
 
  return (
    <div className={`container`}>  
      <div className={`${idleground ? "back-ground" : ""}`}></div>  
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
       {!!user ? (<h3>Hi {user.username}</h3>): ''}
       <span>{!!user ? user.accounttype : 'Loading...'}</span>
      </div>
      </nav> 
      {<Notifications />  ? <Notifications />  : ''}
      <div className='sidebar-content'>
      <div className={`sidebar-container ${navbarCollapse ? "navbarCollaps" : " "}`}>
        <Link to='/adminpage' className='nav-option option1' title='Dashboard'>
        <i className='bi bi-speedometer2'></i>
          <h3>Dashboard</h3>
        </Link>
        <Link to='/stores' className='nav-option option2' title='Stores'>
        <i className='bi bi-shop-window'></i>
          <h3>Store</h3>
        </Link>
        <Link to='/users' className='nav-option option3' title='Users'>
        <i className='bi bi-people-fill'></i>
          <h3>Users</h3>
        </Link>
        <Link to='/suppliers' className='nav-option option4' title='Suppliers'>
        <i className='bi bi-truck'></i>
          <h3>Suppliers</h3>
        </Link>
        <Link to='/categories' className='nav-option option5' title='Categories'>
        <i className='bi bi-diagram-3-fill'></i>
          <h3>Categories</h3>
        </Link>
        <Link to='/products' className='nav-option option6' title='Products'>
        <i className='bi bi-bag-fill'></i>
          <h3>Products</h3>
        </Link>
        <Link to='/orders' className='nav-option option7' title='Orders'>
        <i className='bi bi-list-task'></i>
          <h3>Orders</h3>
        </Link>  
        <Link to='/reports' className='nav-option option8' title='Reports'>
        <i className='bi bi-bar-chart-fill'></i>
          <h3>Reports</h3>
        </Link>
        <Link to='/creditors' className='nav-option option9' title='Creditors'>
          <i className='bi bi-person-lines-fill'></i>
          <h3>Creditors</h3>
        </Link>
        <Link to='/expires' className='nav-option option10' title='Expires'>
        <i className='bi bi-slash-circle-fill'></i>
          <h3>Expired</h3>
        </Link>
        <Link to='/settings' className='nav-option option1' title='Settings'>
        <i className='bi bi-gear'></i>
          <h3>Settings</h3>
        </Link>
        <button className='nav-option option1' style={{background: 'red', border: 'none'}} onClick={handleLogout} title='Log out'>
        <i className='bi bi-box-arrow-right' style={{background: 'red'}}></i>
          <h3>Log out</h3>
        </button>
      </div>
      </div>
      <div className='notification-content'>
        <i className='bi bi-x-lg' style={{fontSize : '25px', color : 'red', cursor: 'pointer', zIndex: '6000', backgroundColor : '#e9d8ff'}} onClick={handleClick}></i>
  
        <div className='note-content' id='notes'>
             
          {!!ischeckin ?
            ischeckin.map((chec, d) => {
                 var al_ertin = '';
                 var qt_check = chec.quantity;
                 var qty = !!mini && mini.map((min) => min.minimumqty);
               if(qt_check === qty.toString()){
                   al_ertin = 
                          <div className='msg-data' id='ads-warning' key={d}>
                            <p>
                             {chec.name} 
                            </p>
                            <p>
                             Remained :: {qt_check}
                            </p>
                  </div>
                   ;
                }else{
                  al_ertin = '';
                }
                
            return al_ertin;
            })
          : ''
          }

          {!!ischeckin ?
             ischeckin.map((checkin, ind) => {
                 var al_ert = '';
               if(checkin.quantity <= 0){
                   return (
                  <div className='msg-data' id='ads' key={ind}>
                     <p>
                      {checkin.name}
                     </p>
                     <p>
                      Remained :: {checkin.quantity}
                     </p>
                  </div>
                   );
                }else{
                  al_ert = '';
                }
                
            return al_ert;
            })
           : ''
          }

          {
            !!notify 
            ? 
            notify.map((not, indx) => {
            var clas = '';
            if(not.read === 'yes'){
               clas = 'msg-read';
            }

            if(not.read === 'no'){
              clas = 'msg-data';
            }

            return (
              <div className={clas} id='edit-read' key={indx}>
                  <p>
                   {not.staffname}, Generated Invoice
                  </p>
                  <p>
                   invoice No. :: {not.invoiceno} 
                  </p>
                  <p>
                   paid :: KES. {not.paid} 
                  </p>
              </div>
            );
          })
          :<span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>
          }

        </div>

        <button id='mark-read' onClick={handleRead}>Mark All as Read</button>
      </div>
      <div className='row'>
      <div className={`modal ${idleground ? "open" : ""}`} style={{background : 'rgb(107, 0, 0)', color: '#fff', zIndex: '12000'}}>
        <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h3>Session Timeout</h3>
                <i className='bi bi-clock-history'></i>
              </div>
              <div className='modal-body' style={{borderBottom: 'none', borderTop : '1px solid #fff'}}>
                <h2>Hey {!!user && user.username}, ARE YOU STILL ON ?</h2>
                <div className='col'>
                <i className='bi bi-exclamation-triangle-fill' style={{fontSize: '100px', color: 'orange'}}></i> 
                <p style={{color: 'gray'}}>Your session is about to expire.</p>
                <p>You will be logged out in 60 seconds.</p>
                </div>
              </div>   
              <div className='modal-footer'>
              <span>.</span>
              <button type='button' className='back' onClick={handleClose}>Continue Session</button>
              <button type='submit' className='send' id='autolog' style={{background: 'red'}} onClick={handleLogout}>Log Out</button>
               </div>      
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Sidebar
