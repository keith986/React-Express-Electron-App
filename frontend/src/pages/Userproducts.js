import React from 'react'
import '../App.css'

const Products = () => {
  
    return (
      <div className={`container-fluid`}>
      <h2>Stock Inventory</h2>
    
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

export default Products
