import React, { useContext, useState } from 'react'
import './Sidebar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  if(!!user && user.accounttype !== 'Admin'){
    navigate('/login')
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
      {!!user && (<h3>Hi {user.username}</h3>)}
      <span>{!!user && user.accounttype}</span>
      </div>
      </nav>

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

    </div>
  )
}

export default Sidebar
