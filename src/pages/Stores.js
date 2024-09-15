import React,{useEffect, useState} from 'react'
import '../App.css'
import axios from 'axios'
import {toast} from 'react-hot-toast'

const Stores = () => {
  const [usedata, setUseData] = useState([]);
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
  const [filterData, setFilterData] = useState(null)  

  const handleOpener = () =>{
    setIsOpenModal(true)
  }

  const handleEditOpener = (event) => {
    setIsEditOpen(true)
    setStoreId(event.target.id)
  }

  const handleDelete = (event) => {
axios.post('/deletestore', {deleting : event.target.id})
     .then((result) => {
      if(result.data.error){
        toast.error(result.data.error)
      }
      if(result.data.success){
       toast.success(result.data.success)
       setTimeout(() => {
        window.location.reload();
      }, 3000);   
      }

      })
     .catch(err => toast.error(err.message))
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
                    toast.success(result.data.success);
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
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
                    toast.success(result.data.success);
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
                    
                   }

    })
    .catch(err => toast.error(err.message))
  }

  useEffect(()=>{
       axios.post('/storeData')
            .then((result) => {
              setUseData(result.data)
              setFilterData(result.data)
            })
            .catch(err => console.log(err))
  }, [])


const [currentPage, setCurrentPage] = useState(1)
const rowPerPage = 5
const lastIndex = rowPerPage * currentPage
const firstIndex = lastIndex - rowPerPage
const records = !!usedata ? usedata.slice(firstIndex, lastIndex) : ''
const nPage = Math.ceil(usedata.length / rowPerPage)
const numbers = [...Array(nPage + 1).keys()].slice(1)

const handlePrev = () => {
  if(currentPage !== 1){
    return setCurrentPage(currentPage - 1)
  }else{
    return setCurrentPage(1)
  }
}

const handleNext = () => {
  if(currentPage !== nPage){
     setCurrentPage(currentPage + 1)
  }else{
     setCurrentPage(nPage)
  }
}

function handlePage (id) {
   setCurrentPage(id)
}

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

                 {!!records && records.map((data) => {
                    return (
                               <tr className='tr-row' id={'store-' + data._id}>
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
      <div className='row'>
      <nav className='page-nav'>
        <ul className='pagination'>
         
          <li className='page-item'>
            <button onClick={handlePrev}>Prev</button>
          </li>

          {!!numbers && numbers.map((n, i) => {
            return (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                  <button onClick={() => handlePage(n)}>{n}</button>
                </li>
                   );
          })}

          <li className='page-item'>
            <button onClick={handleNext}>Next</button>
          </li>

        </ul>
      </nav> 
      </div>
    </div>
  )
}

export default Stores
