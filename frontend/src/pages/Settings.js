import React, {useContext} from 'react'
import logo from '../assets/images/userlogo.png'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Settings = () => {

  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  //time and date
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
    var ids = user._id;
    axios.post('/adminlogout', {ids,thee_date, thee_time})
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
  }

  return (
    <div className='container-fluid'>
      <h2>My Profile</h2>
      <div className='row'>
      <img src={logo} alt='logo' style={{width: '200px', height: '200px'}}/>
      <div className='admin-detail'>
        <p>ADMINID : {!!user && user._id}</p>
        <h3>Admin Name : {!!user && user.username}</h3>
        <p><i className='bi bi-phone-fill'></i> {!!user && user.adminphone}</p>
        <p><i className='bi bi-envelope-open-fill'></i> {!!user && user.adminemail}</p>
        <p><i className='bi bi-clock-fill'></i> {!!user && user.createdAt}</p>
      </div>
      <div className='company-detail'>
      <h3>Company Details</h3>
        <h5>Company Name</h5>
        <p className='span-name'>{!!user && user.companyname}</p>
        <h5>Email</h5>
        <p className='span-name'>{!!user && user.companyemail}</p>
        <h5>Phone</h5>
        <p className='span-name'>{!!user && user.companyphone}</p>
        <h5>Address</h5>
        <p className='span-name'>{!!user && user.companylocation}</p>
      </div>
      </div>
      <div className='row'>
        <div className='col'>
        <h2>Authentication detail</h2>
        <p>user: {!!user && user.accounttype}</p>
        <p>Last Login : {!!user && user.date} , {!!user && user.time} </p>
        </div>
      </div>
      <button className='logout' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Settings
