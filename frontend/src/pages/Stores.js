import React,{useEffect, useState} from 'react'
import '../App.css'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Stores = () => {
  
  const navigate = useNavigate();
  const [usedata, setUseData] = useState(false);
  const [store, setStore] = useState({
    storename: '',
    manager: '',
    location: '',
    phone: '',
    status: ''
  });
  const [isModalOpen, setIsOpenModal] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [storeid, setStoreId] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [filterData, setFilterData] = useState({})  

  const handleOpener = () =>{
    setIsOpenModal(true)
  }

  const handleEditOpener = (event) => {
    setIsEditOpen(true)
    setStoreId(event.target.id)
  }

  const handleDelete = (event) => {
    setDeleting(event.target.id)
    const parent = document.getElementById(event.target.id);
    parent.style.display = 'none';
  }

  function handleClose(){
    setIsOpenModal(false)
  }

  const handleEditClose = () => {
    setIsEditOpen(false)
  }

  const handlefilter = (event) => {
     const resp = filterData.filter(f => f.storename.includes(event.target.value))
     setUseData(resp)
  }

  const handleChange = async (event) => {
    setStore({...store, [event.target.name]:[event.target.value]})
  }

  const submitChange = async (e) => {
    e.preventDefault();

      await axios.post('/store', {store})
                 .then((result) => {

                   if(result.data.error){
                      toast.error(result.data.error)
                   }

                   if(result.data.success){
                    setStore({})
                    toast.success(result.data.success)
                    navigate('/stores')
                   }

                 })
                 .catch(err => toast.error(err.message))

  }

  const submitEditChange = async (e) => {
     e.preventDefault();

     await axios.post('/editstore', {store, storeid})
                .then((result) => {

                  if(result.data.error){
                    toast.error(result.data.error)
                  }

                  if(result.data.success){
                    toast.success(result.data.success)
                    navigate('/stores')
                   }

    })
    .catch(err => toast.error(err.message))
  }

  useEffect(()=>{
       axios.get('/storeData')
            .then((result) => {
              console.log(result)
              setUseData(result.data)
              setFilterData(result.data)
            })
            .catch(err => console.log(err))
  }, [])

  useEffect(() => {
       axios.post('/deletestore', {deleting})
            .then((result) => {

              if(result.data.error){
                toast.error(result.data.error)
              }

              if(result.data.success){
               toast.success(result.data.success)
            
              }

              })
            .catch(err => toast.error(err.message))
  }, [deleting])

  return (
    <div className={`container-fluid`}>
   
    <div className={`${isModalOpen ? "background" : ""}`}></div>
    <div className={`${isEditOpen ? "background" : ""}`}></div>
    <h2>Stores</h2>
   <div className='row'>
      <button type='button' className='modalopener' onClick={handleOpener}>Add Store</button>
      
      <div className={`modal ${isModalOpen ? "open" : ""}`}>
      <form onSubmit={submitChange}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>New Store</h2>
              <i className='bi bi-bag-fill'></i>
            </div>
            <div className='modal-body'>
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
              <option>Choose...</option>
              <option value="Closed">Closed</option>
              <option value="Opened">Opened</option>
            </select>
            </div>
            <div className='modal-footer'>
            <span>.</span>
            <button type='button' className='back' onClick={handleClose}>Back</button>
            <button type='submit' className='send'>Add Store</button>
            </div>
          </div>
        </div>
        </form>
      </div>
      
      <div className={`modal ${isEditOpen ? "edit" : ""}`}>
      <form onSubmit={submitEditChange}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 style={{color: 'blue'}}>Update Store</h2>
               <i className='bi bi-bag-fill' style={{color: 'blue'}}></i>
            </div>
            <div className='modal-body'>
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
              <option>Choose...</option>
              <option value="Closed">Closed</option>
              <option value="Opened">Opened</option>
            </select>
            </div>
            <div className='modal-footer'>
            <span>.</span>
            <button type='button' className='back' onClick={handleEditClose}>Back</button>
            <button type='submit' className='send' style={{background: 'blue'}}>Update Store</button>
            </div>
          </div>
        </div>
        </form>
      </div>

   </div>
    <div className='row'>
    <div className='col-divide'>
      <p>Search : </p>
      <input type='search' className='search' placeholder='Search By Name' onChange={handlefilter}/>
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

                 {!!usedata && usedata.map((data) => {
                    return (
                               <tr className='tr-row' id={data._id}>
                                  <td>{data.storename}</td>
                                  <td>{data.location}</td>
                                  <td>{data.manager}</td>
                                  <td>{data.phone}</td> 
                                  <td style={{backgroundColor: 'gray'}}>{data.status}</td>
                                  <td>
                                    <i className='bi bi-pencil-fill tr-icon' id={data._id} onClick={handleEditOpener}></i>
                                    <i className='bi bi-trash-fill tr-icon' id={data._id} onClick={handleDelete}></i>
                                  </td>
                               </tr>
                    );
                  })
                  }
              
            </table>

          </div>
      </div>
    
    </div>
  )
}

export default Stores
