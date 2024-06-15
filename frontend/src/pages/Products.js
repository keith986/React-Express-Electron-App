import React, {useState} from 'react'
import '../App.css'

const Products = () => {
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
      <h2>Stock Inventory</h2>
     <div className='row'>
        <button type='button' className='modalopener' onClick={handleOpener}>New Stock</button>
        <div className={`modal ${isModalOpen ? "open" : ""}`}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>Add Product</h2>
                <i className='bi bi-bag-fill'></i>
              </div>
              <div className='modal-body'>
              <span className='name'>Product Name</span>
              <input type='text' className='name-input'/>
              <span className='name'>Product description</span>
              <input type='text' className='manager-input' placeholder='e.g Men shoes'/>
              <span className='name'>Cost Price</span>
              <input type='number' className='location-input' placeholder='1000'/>
              <span className='name'>Selling Price</span>
              <input type='tel' className='phone-input' placeholder='1500'/>
              <span className='name'>Quantity</span>
              <input type='number' className='phone-input' />
              <span className='name'>Categories</span>
              <select className='status-input'>
                <option disabled>Choose...</option>
                <option>Food</option>
                <option>Clothes</option>
              </select>
              <span className='name'>Supplier</span>
              <select className='status-input'>
                <option disabled>Choose...</option>
                <option>Sup 1</option>
                <option>Sup 2</option>
              </select>
              <span className='name'>Warehouse</span>
              <select className='status-input'>
                <option disabled>Choose...</option>
                <option>Store 1</option>
                <option>Store 2</option>
              </select>
              <span className='name'>MANUFACTURED DATE</span>
              <input type='date' className='date-input'/>
              <span className='name'>EXPIRY DATE</span>
              <input type='date' className='date-input'/>
              </div>
              <div className='modal-footer'>
              <span>.</span>
              <button type='button' className='back' onClick={handleClose}>Back</button>
              <button type='button' className='send'>Add Product</button>
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
              <table className='table' id='tablexl'>
                <tr>
                  <th>BARCODE</th>
                  <th>PRODUCT</th>
                  <th>CATEGORIES</th>
                  <th>EXPIRY DATE</th>
                  <th>PRICE</th>
                  <th>IN STOCK</th>
                  <th>STORE</th>
                  <th>ACTIONS</th>
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

export default Products
