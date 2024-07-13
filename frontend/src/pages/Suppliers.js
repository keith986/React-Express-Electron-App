import React, {useState, useEffect} from 'react'
import '../App.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import $ from 'jquery'

const Suppliers = () => {
    const [isModalOpen, setIsOpenModal] = useState(false)
    const [supplier, setSupplier] = useState({
      name : '',
      email : '',
      company: '',
      phone : '',
      location: '',
      warehouse: ''
    })
    const [supplierdata, setSupplierData] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [storeid, setStoreId] = useState(null)
    const [filterDatas, setFilterData] = useState(null) 
    const [storedata, setStoreData] = useState(null) 

  const handleOpener = () =>{
    setIsOpenModal(true)
  }

  const handleEditOpener = (event) => {
    setIsEditOpen(true)
    setStoreId(event.target.id)
  } 

  const handleDelete = (event) => {
    axios.post('/deletesupplier', {deleting : event.target.id})
    .then((result) => {
      
       if(result.data.success){
          toast.success(result.data.success);
          $('#supplier-' + event.target.id).hide();
       }

       if(result.data.error){
          toast.error(result.data.error);
       }

    })
    .catch((error) => toast.error(error))
  }

  function handleClose(){
    setIsOpenModal(false)
  }

  const handleChange = (event) => {
      setSupplier({...supplier, [event.target.name] : [event.target.value]})
  }

  const handleEditClose = () => {
    setIsEditOpen(false)
  }

  const handlefilter = (event) => {
    const resp = filterDatas.filter(s => s.name.includes(event.target.value))
    setSupplierData(resp)
 }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/addsupplier', {supplier})
               .then((result) => {
                   if(result.data.success){
                      toast.success(result.data.success)
                      setSupplierData({})
                   }
                   if(result.data.error){
                    toast.error(result.data.error)
                   }
               })
  }

  useEffect(() => {
     axios.get('/getsuppliers')
          .then((result) => {
            setSupplierData(result.data)
            setFilterData(result.data)
          })
          .catch((err) => {
            toast.error(err)
          })
  }, [supplierdata])


  const submitEditChange = async (e) => {
    e.preventDefault();
    await axios.post('/editsupplier', {supplier, storeid})
               .then((result) => {

                 if(result.data.error){
                   toast.error(result.data.error)
                 }

                 if(result.data.success){
                   toast.success(result.data.success)
                   setSupplierData({})
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

  return (
    <div className={`container-fluid`}>
    <div className={`${isModalOpen ? "background" : ""}`}></div>
    <div className={`${isEditOpen ? "background" : ""}`}></div>
    <h2>Suppliers Information</h2>
   <div className='row'>
      <button type='button' className='modalopener' onClick={handleOpener}>New Supplier</button>
      <div className={`modal ${isModalOpen ? "open" : ""}`}>
        <div className='modal-dialog'>
        <form onSubmit={handleSubmit}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>New Supplier</h2>
              <i className='bi bi-truck'></i>
            </div>
            <div className='modal-body'>
            <span className='name'>Supplier Name</span>
            <input type='text' className='name-input' name='name' onChange={handleChange}/>
            <span className='name'>Company</span>
            <input type='text' className='manager-input' name='company' onChange={handleChange}/>
            <span className='name'>Email</span>
            <input type='text' className='location-input' name='email' onChange={handleChange}/>
            <span className='name'>Phone number</span>
            <input type='tel' className='location-input' name='phone' onChange={handleChange}/>
            <span className='name'>Address</span>
            <input type='text' className='location-input' name='location' onChange={handleChange}/>
            <span className='name'>Warehouse</span>
            <select className='status-input' name='warehouse' onChange={handleChange}>
            <option>Choose...</option>
              {!!storedata && storedata.map((str) => {
                var stname = str.storename;
                if(str.status === 'Closed'){
                   return !stname;
                }
                return (
                    <option value={`${str.storename}`}>{stname}</option>
                       )
                })
              }
            </select>
            </div>
            <div className='modal-footer'>
            <span>.</span>
            <button type='button' className='back' onClick={handleClose}>Back</button>
            <button type='submit' className='send'>Add Supplier</button>
            </div>

          </div>
          </form>
        </div>
      </div>

      <div className={`modal ${isEditOpen ? "edit" : ""}`}>
        <div className='modal-dialog'>
        <form onSubmit={submitEditChange}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>Update Supplier</h2>
              <i className='bi bi-truck'></i>
            </div>
            <div className='modal-body'>
            <span className='name'>Supplier Name</span>
            <input type='text' className='name-input' name='name' onChange={handleChange}/>
            <span className='name'>Company</span>
            <input type='text' className='manager-input' name='company' onChange={handleChange}/>
            <span className='name'>Email</span>
            <input type='text' className='location-input' name='email' onChange={handleChange}/>
            <span className='name'>Phone number</span>
            <input type='tel' className='location-input' name='phone' onChange={handleChange}/>
            <span className='name'>Address</span>
            <input type='text' className='location-input' name='location' onChange={handleChange}/>
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
            <button type='submit' className='send'>Update Supplier</button>
            </div>

          </div>
          </form>
        </div>
      </div>

   </div>
    <div className='row'>
    <div className='col-divide'>
       <p>Search : </p>
      <input type='search' className='search' placeholder='Search By Name...' onChange={handlefilter}/>
    </div>
    </div>
      <div className='row'>
      <div className='col'>
            <table className='table' id='tablesm'>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>REGdate</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {!!supplierdata && supplierdata.map((sup) => {
                

                  return (
                          <tr className='tr-row' id={'supplier-' + sup._id}>
                          <td>{sup.name}</td>
                          <td>{sup.company}</td>
                          <td>{sup.createdAt}</td>
                          <td>{sup.email}</td>
                          <td>{sup.phone}</td>
                          <td>{sup.location}</td>
                          <td>   
                            <i className='bi bi-pencil-fill tr-icon' id={sup._id} onClick={handleEditOpener}></i>
                            <i className='bi bi-trash-fill tr-icon' id={sup._id} onClick={handleDelete}></i>
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

export default Suppliers
