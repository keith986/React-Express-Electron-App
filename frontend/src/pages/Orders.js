import React from 'react'
import '../App.css'

const Orders = () => {
  return (
    <div className='container-fluid'>
    <h2>All Orders</h2>
      
      <div className='row'>
      <div className='col-divide'>
       <select className='select'>
        <option>5 of 5</option>
        <option>10 of 10</option>
      </select>
      <input type='search' className='search' placeholder='Search By ORDERID...'/>
    </div>
    </div>

      <div className='row'>
      <div className='col'>
            <table className='table' id='tablext'>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>PHONE/EMAIL</th>
                <th>TOTAL</th>
                <th>DISCOUNT(%)</th>
                <th>PAYABLE</th>
                <th>PAID</th>
                <th>PAYMENT</th>
                <th>STATUS</th>
                <th>STAFF</th>
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

export default Orders
