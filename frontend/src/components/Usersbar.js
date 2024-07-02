import React, { useState } from 'react'
import './Sidebar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    if(!!user && user.accounttype !== 'staff'){
      navigate('/login');
    }

    const [navbarCollapse, setNavCollapse] = useState(false);

  return (
    <div className={`container`}>
      <nav className='nav'>
      <div className='logo'>
      <h2>POStore</h2>
      <i className='bi bi-justify' onClick={e => setNavCollapse(!navbarCollapse)}></i>
      </div>
      <div className='user-profile'>
      <h3>{!!user && user.username}</h3>
      <span>{!!user && user.accounttype}</span>
      </div>
      </nav>

      <div className='sidebar-content'>
      <div className={`sidebar-container ${navbarCollapse ? "navbarCollaps" : " "}`}>
        <a href='/userpage' className='nav-option option1'>
        <i className='bi bi-speedometer2'></i>
          <h3>Dashboard</h3>
        </a>
        <a href='/usercategories' className='nav-option option5'>
        <i className='bi bi-diagram-3-fill'></i>
          <h3>Categories</h3>
        </a>
        <a href='/userproducts' className='nav-option option6'>
        <i className='bi bi-bag-fill'></i>
          <h3>Products</h3>
        </a>
        <a href='/POS' className='nav-option option7'>
        <i className='bi bi-cart-check-fill'></i>
          <h3>POS</h3>
        </a>
        <a href='/userorders' className='nav-option option7'>
        <i className='bi bi-list-task'></i>
          <h3>Orders</h3>
        </a>  
        <a href='/userreports' className='nav-option option8'>
        <i className='bi bi-bar-chart-fill'></i>
          <h3>Reports</h3>
        </a>
        <a href='/usercreditors' className='nav-option option9'>
        <i className='bi bi-person-lines-fill'></i>
          <h3>Credit Sales</h3>
        </a>
        <a href='/usersettings' className='nav-option option1'>
        <i className='bi bi-gear'></i>
          <h3>Settings</h3>
        </a>
      </div>
      </div>

    </div>
  )
}

export default Sidebar
