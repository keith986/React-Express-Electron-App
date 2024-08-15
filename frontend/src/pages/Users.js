import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../App.css'
import toast from 'react-hot-toast'
import $ from 'jquery'

const Users = () => {
    const [isModalOpen, setIsOpenModal] = useState(false)
    const [addUser, setAddUser] = useState({
      fullname : '',
      username : '',
      email: '',
      password : '',
      role : '',
      warehouse: ''
    })  
    const [storedata, setStoreData] = useState([])
    const [usersDatas, setUsersDatas] = useState([])
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [storeid, setStoreId] = useState(null)
    const [filterDatas, setFilterData] = useState([])  

  const handleOpener = () =>{
    setIsOpenModal(true)
  }

  const handleEditOpener = (event) => {
    setIsEditOpen(true)
    setStoreId(event.target.id)
  }

  const handleDelete = (event) => {
axios.post('/deleteuser', {deleting : event.target.id})
     .then((result) => {
      if(result.data.error){
        toast.error(result.data.error)
      }
      if(result.data.success){
       toast.success(result.data.success)
       $('#user-'+event.target.id).hide()   
      }

      })
     .catch(err => toast.error(err.message))
  }

  const handleChange = (event) => {
    setAddUser({...addUser, [event.target.name] : [event.target.value]})
  }

  function handleClose(){
    setIsOpenModal(false)
  }

  const handleEditClose = () => {
    setIsEditOpen(false)
  }

  const handlefilters = (event) => {
    const resp = filterDatas.filter(s => s.fullname.includes(event.target.value))
    setUsersDatas(resp)
  }

  const submitEditChange = async (e) => {
    e.preventDefault();
    await axios.post('/edituser', {addUser, storeid})
               .then((result) => {

                 if(result.data.error){
                   toast.error(result.data.error)
                 }

                 if(result.data.success){
                   toast.success(result.data.success)
        
                  }

   })
   .catch(err => toast.error(err.message))
  }

  useEffect(() => {
       axios.get('/storeData')
            .then((result) => {
              setStoreData(result.data)
            })
            .catch(err => console.log(err))
  }, [storedata])

  useEffect(() => {
       axios.get('/users')
            .then((result) => {
              setUsersDatas(result.data)
              setFilterData(result.data)
              if(result.data.error){
                toast.error(result.data.error)
              }
            })
            .catch(err => toast.error(err))
  }, [usersDatas])

  //pagination
const [currentPage, setCurrentPage] = useState(1)
const rowPerPage = 5
const lastIndex = rowPerPage * currentPage
const firstIndex = lastIndex - rowPerPage
const records = usersDatas.slice(firstIndex, lastIndex)
const nPage = Math.ceil(usersDatas.length / rowPerPage)
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

const submitUser = async (e) => {
  e.preventDefault();
  await axios.post('/adduser', {addUser})
             .then((result) => {
        
        if(result.data.error){
          toast.error(result.data.error)
       }

       if(result.data.success){
        setAddUser({})
        toast.success(result.data.success)
        
       }

        })
}
  return (
    <div className={`container-fluid`}>
    <div className={`${isModalOpen ? "background" : ""}`}></div>
    <div className={`${isEditOpen ? "background" : ""}`}></div>
    <h2>Users</h2>
   <div className='row'>
      <button type='button' className='modalopener' onClick={handleOpener}>Add User</button>
      <div className={`modal ${isModalOpen ? "open" : ""}`}>
      <form onSubmit={submitUser}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>New User</h2>
              <i className='bi bi-people-fill'></i>
            </div>
            <div className='modal-body'>
            <span className='name'>Name</span>
            <input type='text' className='name-input' name='fullname' onChange={handleChange}/>
            <span className='name'>Username</span>
            <input type='text' className='manager-input' name='username' onChange={handleChange}/>
            <span className='name'>Email</span>
            <input type='text' className='location-input' name='email' onChange={handleChange}/>
            <span className='name'>Password</span>
            <input type='text' className='phone-input' name='password' onChange={handleChange}/>
            <span className='name'>Role</span>
            <select className='status-input' name='role' onChange={handleChange}>
              <option >Choose...</option>
              <option value="Admin">Admin</option>
              <option value="staff">staff</option>
            </select>
            <span className='name'>Warehouse</span>
            <select className='status-input' name='warehouse' onChange={handleChange}>
            <option>Choose...</option>
              {!!storedata && storedata.map((str) => {
                if(str.status === 'Closed'){
                  return !str;
                }
                return (
                    <option value={`${str.storename}`}>{str.storename}</option>
                       )
                })
              }
            </select>
            </div>
            <div className='modal-footer'>
            <span>.</span>
            <button type='button' className='back' onClick={handleClose}>Back</button>
            <button type='submit' className='send'>Add User</button>
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
              <h2 style={{color: 'blue'}}>Update User Details</h2>
               <i className='bi bi-bag-fill' style={{color: 'blue'}}></i>
            </div>
            <div className='modal-body'>
            <span className='name'>Name</span>
            <input type='text' className='name-input' name='fullname' onChange={handleChange}/>
            <span className='name'>Username</span>
            <input type='text' className='manager-input' name='username' onChange={handleChange}/>
            <span className='name'>Email</span>
            <input type='text' className='location-input' name='email' onChange={handleChange}/>
            <span className='name'>Password</span>
            <input type='text' className='phone-input' name='password' onChange={handleChange}/>
            <span className='name'>Role</span>
            <select className='status-input' name='role' onChange={handleChange}>
              <option >Choose...</option>
              <option value="Admin">Admin</option>
              <option value="staff">staff</option>
            </select>
            <span className='name'>Warehouse</span>
            <select className='status-input' name='warehouse' onChange={handleChange}>
              {!!storedata && storedata.map((str) => {
                return (
                    <option value={`${str.storename}`}>{str.storename}</option>
                       )
                })
              }
            </select>
            </div>
            <div className='modal-footer'>
            <span>.</span>
            <button type='button' className='back' onClick={handleEditClose}>Back</button>
            <button type='submit' className='send' style={{background: 'blue'}}>Update User</button>
            </div>
          </div>
        </div>
        </form>
      </div>

   </div>
    <div className='row'>
    <div className='col-divide'>
       <p>Search :</p>
      <input type='search' className='search' placeholder='Search By name...' onChange={handlefilters}/>
    </div>
    </div>
      <div className='row'>
      <div className='col'>
            <table className='table'>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Store</th>
                <th>Last Logged out</th>
                <th>Actions</th>
              </tr>
                {!!records && records.map((user) => {
                  return (
                          
                          <tr className='tr-row' id={'user-' + user._id}>
                            <td>{user.fullname}</td>
                            <td>{user.username}</td>
                            <td>{user.useremail}</td>
                            <td>{user.role}</td>
                            <td>{user.warehouse}</td>
                            <td>{user.date}, {user.time}</td>
                            <td>
                            <i className='bi bi-pencil-fill tr-icon' id={user._id} onClick={handleEditOpener}></i>
                            <i className='bi bi-trash-fill tr-icon' id={user._id} onClick={handleDelete}></i>
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

export default Users
