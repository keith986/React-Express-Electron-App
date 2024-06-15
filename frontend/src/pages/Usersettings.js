import React from 'react'
import logo from '../assets/images/userlogo.png'

const Settings = () => {
  return (
    <div className='container-fluid'>
      <h2>My Profile</h2>
      <div className='row'>
      <img src={logo} alt='logo' style={{width: '200px', height: '200px'}}/>
      <div className='admin-detail'>
        <p>USERID</p>
        <h3>Username</h3>
        <p><i className='bi bi-phone-fill'></i> Phone</p>
        <p><i className='bi bi-envelope-open-fill'></i> Email</p>
        <p><i className='bi bi-clock-fill'></i> REG Date</p>
      </div>
      </div>
      <div className='row'>
        <div className='col'>
        <h2>Authentication detail</h2>
        <p>user: Staff</p>
        <p>Last Login : 12th May 2024 , 9:00 pm</p>
        </div>
      </div>
      <button className='logout'>Logout</button>
    </div>
  )
}

export default Settings
