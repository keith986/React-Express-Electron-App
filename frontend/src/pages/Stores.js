import React,{useState} from 'react'
import '../App.css'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from './../context/userContext';

const Stores = () => {

  const {user} = useContext(UserContext)

  const [store, setStore] = useState({
    userid: '',
    storename: '',
    manager: '',
    location: '',
    phone: '',
    status: ''
  });
  const [isModalOpen, setIsOpenModal] = useState(false)

  const handleOpener = () =>{
    setIsOpenModal(true)
  }

  function handleClose(){
    setIsOpenModal(false)
  }

  const handleChange = async (event) => {
    setStore({...store, [event.target.name]:[event.target.value]})
  }

  const submitChange = async () => {
      await axios.post('/store', {store})
                 .then((result) => {

                   if(result.data === 'error'){
                      toast.error('Something went wrong!Please try Again!')
                   }

                   if(result.data === 'success'){
                    toast.success('Store added Successfully!')
                   }

                 })
                 .catch(err => toast.error(err.message))

  }

  return (
    <div className={`container-fluid`}>
   
    <div className={`${isModalOpen ? "background" : ""}`}></div>
    <h2>Stores</h2>
   <div className='row'>
      <button type='button' className='modalopener' onClick={handleOpener}>Add Store</button>
      <form onSubmit={submitChange}>
      <div className={`modal ${isModalOpen ? "open" : ""}`}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>New Store</h2>
              <i className='bi bi-bag-fill'></i>
            </div>
            <div className='modal-body'>
            <input type='text' name='userid' value={!!user && user._id} onChange={handleChange}/>
            <span className='name'>Name</span>
            <input type='text' className='name-input' name='storename' onChange={handleChange}/>
            <span className='name'>Manager</span>
            <input type='text' className='manager-input' name='manager' onChange={handleChange}/>
            <span className='name'>Location</span>
            <input type='text' className='location-input' name='location' onChange={handleChange}/>
            <span className='name'>Store phone</span>
            <input type='tel' className='phone-input' name='phone' onChange={handleChange}/>
            <span className='name'>Status</span>
            <select className='status-input' name='status' onChange={handleChange}>
              <option disabled>Choose...</option>
              <option>Open</option>
              <option>Close</option>
            </select>
            </div>
            <div className='modal-footer'>
            <span>.</span>
            <button type='button' className='back' onClick={handleClose}>Back</button>
            <button type='submit' className='send'>Add Store</button>
            </div>
          </div>
        </div>
      </div>
      </form>
   </div>
    <div className='row'>
    <div className='col-divide'>
       <select className='select'>
        <option>5 of 5</option>
        <option>10 of 10</option>
      </select>
      <input type='search' className='search' placeholder='Search By Name'/>
    </div>
    </div>
      <div className='row'>
      <div className='col'>
            <table className='table'>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Manager</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>No entry</td>
                <td>No entry</td>
                <td>No entry</td>
                <td>No entry</td>
                <td>No entry</td>
                <td>No entry</td>
              </tr>
            </table>

          </div>
      </div>
    
    </div>
  )
}

export default Stores
