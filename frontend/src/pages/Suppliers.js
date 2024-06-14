import React, {useState} from 'react'
import '../App.css'

const Suppliers = () => {
    const [isModalOpen, setIsOpenModal] = useState(false)

  const handleOpener = () =>{
    setIsOpenModal(true)
  }

  function handleClose(){
    setIsOpenModal(false)
  }

  return (
    <div className={`container-fluid`}>
    <div className={`${isModalOpen ? "background" : ""}`}></div>
    <h2>Suppliers Information</h2>
   <div className='row'>
      <button type='button' className='modalopener' onClick={handleOpener}>New Supplier</button>
      <div className={`modal ${isModalOpen ? "open" : ""}`}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>New Supplier</h2>
              <i className='bi bi-truck'></i>
            </div>
            <div className='modal-body'>
            <span className='name'>Supplier Name</span>
            <input type='text' className='name-input'/>
            <span className='name'>Company</span>
            <input type='text' className='manager-input'/>
            <span className='name'>Email</span>
            <input type='text' className='location-input'/>
            <span className='name'>Password</span>
            <input type='tel' className='phone-input'/>
            <span className='name'>Role</span>
            <select className='status-input'>
              <option disabled>Choose...</option>
              <option>Admin</option>
              <option>staff</option>
            </select>
            <span className='name'>Warehouse</span>
            <select className='status-input'>
              <option disabled>Choose...</option>
              <option>Store 1</option>
              <option>Store 2</option>
            </select>
            </div>
            <div className='modal-footer'>
            <span>.</span>
            <button type='button' className='back' onClick={handleClose}>Back</button>
            <button type='button' className='send'>Add Supplier</button>
            </div>

          </div>
        </div>
      </div>
   </div>
    <div className='row'>
    <div className='col-divide'>
       <select className='select'>
        <option>5 of 5</option>
        <option>10 of 10</option>
      </select>
      <input type='search' className='search' placeholder='Search By Name...'/>
    </div>
    </div>
      <div className='row'>
      <div className='col'>
            <table className='table' id='tablesm'>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Company</th>
                <th>REGdate</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>No entry</td>
                <td>No entry</td>
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

export default Suppliers
