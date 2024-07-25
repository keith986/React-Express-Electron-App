import React, {useContext, useEffect, useState} from 'react'
import logo from '../assets/images/userlogo.png'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import $ from 'jquery'

const Settings = () => {
  const [isModal, setIsModal] = useState(false)
  const [isonoff, setIsonoff] = useState('set email notifications')
  const [advanceChange, setAdvanceChange] = useState({
    minimumqty : '',
    targetamt : '',
    date : '',
    year : '',
    month : ''
  })
  const [istoggled, setIsToggled] = useState("on")
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

  const handleClick = async() => {
    setIsModal(true);
  }

  const handleClose = async() => {
    setIsModal(false);
  }

  const handleChange = (e) => {
      setAdvanceChange({...advanceChange, [e.target.name] : [e.target.value]})
  }

  const handleOffClick = (e) => {
    setIsToggled(e.target.id);
    $('#off').hide("3000");
    $('#on').show('3000');
  }

  const handleOnClick = (e) => {
    setIsToggled(e.target.id);
    $('#on').hide("3000"); 
    $('#off').show('3000');
  }

  const handleSubmit = () => {
      axios.post('/advancesettings', {advanceChange, istoggled})
           .then((result) => {
             if(result.data.success){
                 toast.success(result.data.success)
             }
             if(result.data.error){
              toast.error(result.data.error)
             }
            })
           .catch(error => {
            toast.error(error.message)
            })
  }

  useEffect (() => {
    
    axios.post('/setTings')
         .then((result) => {
            setIsonoff(result.data.map(dt => { return dt.toggle; }))
          })
         .catch((erss) => {
           toast.error(erss.message)
          })

  }, [isonoff])

  return (
    <div className='container-fluid'>
      <h2>My Settings</h2>
      <button id="advance" onClick={handleClick}>Advance settings</button>
      <span style={{float: 'right', marginRight : '20px'}}>Email notifications : {!!isonoff && isonoff}</span>
      <div className={`${isModal ? "background" : ""}`}></div>
      <div className='row'>
      <div className={`modal ${isModal ? "open" : ""}`}>
        <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>ADVANCE SETTINGS</h2>
                <i className='bi bi-gear-fill'></i>
              </div>
              <div className='modal-body'>
              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Set miminum quantity for all products:</span>
              <input type='number' className='name-input' name='minimumqty' onChange={handleChange} placeholder='0' style={{width : "30%", borderRadius: '2px'}}/>
              </div>
              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Set end goal/target Amount:</span>
              <input type='number' className='name-input' name='targetamt' onChange={handleChange} placeholder='0' style={{width : "30%", borderRadius: '2px'}}/> 
              </div>
              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Set end goal/target period:</span>
              <div className="digits">
                 <input type="number" maxLength="2" name="date" id="edit-input" onChange={handleChange} placeholder='date'/>
                 <input type="number" maxLength="2" name="month" id="edit-input" onChange={handleChange} placeholder='month'/>
                 <input type="number" maxLength="4" name="year" id="edit-input" onChange={handleChange} placeholder='year'/>
              </div>
              </div>
              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Email Notifications:</span>
              <span>
              <i className='bi bi-toggle-on' id='off' style={{fontSize : "30px", color : "green", filter: "drop-shadow(0 0 0.75rem green)", cursor : "pointer"}} onClick={handleOffClick}></i>
              <i className='bi bi-toggle-off' id='on' style={{fontSize : "30px", color : "black", filter: "drop-shadow(0 0 0.03rem black)", cursor : "pointer"}} onClick={handleOnClick}></i>
              </span>
              </div>
              <div className='modal-footer'>
              <span></span>
              <button type='button' className='back' onClick={handleClose}>Back</button>
              <button type='submit' className='send' onClick={handleSubmit}>Ok</button>
              </div>
              </div>            
          </div>
        </div>
      </div>
      </div>
      <div className='row'>
      <img src={logo} alt='logo' style={{width: '200px', height: '200px'}}/>
      <div className='admin-detail'>
      <p>admin_id : {!!user && user._id}</p>
        <p>username : {!!user && user.username}</p>
        <p><i className='bi bi-phone-fill'></i> {!!user && user.adminphone}</p>
        <p><i className='bi bi-envelope-open-fill'></i> {!!user && user.adminemail}</p>
        
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
        <p>Last Logged out : {!!user && user.date} , {!!user && user.time} </p>
        </div>
      </div>
      <button className='logout' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Settings;
