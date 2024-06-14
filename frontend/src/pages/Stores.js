import React,{useState} from 'react'
import '../App.css'

const Stores = () => {

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
    <h2>Stores</h2>
   <div className='row'>
      <button type='button' className='modalopener' onClick={handleOpener}>Add Store</button>
      <div className={`modal ${isModalOpen ? "open" : ""}`}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>New Store</h2>
              <i className='bi bi-bag-fill'></i>
            </div>
            <div className='modal-body'>
            <span className='name'>Name</span>
            <input type='text' className='name-input'/>
            <span className='name'>Manager</span>
            <input type='text' className='manager-input'/>
            <span className='name'>Location</span>
            <input type='text' className='location-input'/>
            <span className='name'>Store phone</span>
            <input type='tel' className='phone-input'/>
            <span className='name'>Status</span>
            <select className='status-input'>
              <option disabled>Choose...</option>
              <option>Open</option>
              <option>Close</option>
            </select>
            </div>
            <div className='modal-footer'>
            <span>.</span>
            <button type='button' className='back' onClick={handleClose}>Back</button>
            <button type='button' className='send'>Add Store</button>
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
