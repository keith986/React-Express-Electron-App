import React, { useState } from 'react'
import './Sidebar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Sidebar = () => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    if(!!user && user.accounttype !== 'staff'){
      navigate('/login');
    }

    const [navbarCollapse, setNavCollapse] = useState(false);

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

    axios.post('/userlogout', {thee_date, thee_time})
         .then((result) => {
           if(result.data.success){
            navigate('/login');
            window.location.reload();
           }
           if(result.data.error){
            toast.error(result.data.error);
           }
          })
         .catch(error => {
          toast.error(error.message)
          })
  }

  return (
    <div className={`container`}>
      <nav className='nav'>
      <div className='logo'>
        <h2>POStore</h2>
        <i className='bi bi-justify' onClick={e => setNavCollapse(!navbarCollapse)}></i>
      </div>
      <div className='user-profile'>
        <h3>{!!user ? !!user && user.username : 'Loading...'}</h3>
        <span>{!!user && user.accounttype}</span>
      </div>
      </nav>

      <div className='sidebar-content'>
      <div className={`sidebar-container ${navbarCollapse ? "navbarCollaps" : " "}`}>
        <Link to='/userpage' className='nav-option option1' title='Dashboard'>
        <i className='bi bi-speedometer2'></i>
          <h3>Dashboard</h3>
        </Link>
        <Link to='/usercategories' className='nav-option option5' title='Categories'>
        <i className='bi bi-diagram-3-fill'></i>
          <h3>Categories</h3>
        </Link>
        <Link to='/userproducts' className='nav-option option6' title='Products'>
        <i className='bi bi-bag-fill'></i>
          <h3>Products</h3>
        </Link>
        <Link to='/POS' className='nav-option option7' id='cls' title='POS'>
        <i className='bi bi-cart-check-fill'></i>
          <h3>POS</h3>
        </Link>
        <Link to='/userorders' className='nav-option option7' title='Orders'>
        <i className='bi bi-list-task'></i>
          <h3>Orders</h3>
        </Link>  
        <Link to='/userreports' className='nav-option option8' title='Reports'>
        <i className='bi bi-bar-chart-fill'></i>
          <h3>Reports</h3>
        </Link>
        <Link to='/usercreditors' className='nav-option option9' title='Creditors'>
        <i className='bi bi-person-lines-fill'></i>
          <h3>Credit Sales</h3>
        </Link>
        <Link to='/usersettings' className='nav-option option1' title='Settings'>
        <i className='bi bi-gear'></i>
          <h3>Settings</h3>
        </Link>
        <button className='nav-option option1' style={{background: 'red', border: 'none'}} onClick={handleLogout} title='Log out'>
        <i className='bi bi-box-arrow-right' style={{background: 'red'}}></i>
          <h3>Log out</h3>
        </button>
      </div>
      </div>

    </div>
  )
}

export default Sidebar
