import React, {useState} from 'react'
import '../App.css'

const Categories = () => {
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
      <h2>Products Categories</h2>
     <div className='row'>
        <button type='button' className='modalopener' onClick={handleOpener}>New Category</button>
        <div className={`modal ${isModalOpen ? "open" : ""}`}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>Create Categories</h2>
                <i className='bi bi-diagram-3-fill'></i>
              </div>
              <div className='modal-body'>
              <span className='name'>Category's Name</span>
              <input type='text' className='name-input'/>
              </div>
              <div className='modal-footer'>
              <span>.</span>
              <button type='button' className='back' onClick={handleClose}>Back</button>
              <button type='button' className='send'>Create</button>
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
              <table className='table'>
                <tr>
                  <th>No.</th>
                  <th>Category Name</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
                <tr>
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

export default Categories
