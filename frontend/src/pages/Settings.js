import React from 'react'
import logo from '../components/userlogo.png'

const Settings = () => {
  return (
    <div className='container-fluid'>
      <h2>My Profile</h2>
      <div className='row'>
      <img src={logo} alt='logo' style={{width: '250px', height: '250px'}}/>
      <div className='admin-detail'>
        <h2>Admin Name</h2>
        <p>ADMINID</p>
        <p>PHONE</p>
        <p>EMAIL</p>
        <p>REG DATE</p>
      </div>
      </div>
      <div className='row'>
        <div className='col'>
        <h2>Authentication detail</h2>
        <p>user: Admin/staff</p>
        <p>Last Login : 12th May 2024 , 9:00 pm</p>
        </div>
      </div>
      <button className='logout'>Logout</button>
    </div>
  )
}

export default Settings
