import React from 'react'
import '../App.css'

const Creditors = () => {
  return (
    <div className='container-fluid'>
      <h2>Credit Sale Records</h2>

      <div className='row'>
      <div className='col-divide'>
       <select className='select'>
        <option>5 of 5</option>
        <option>10 of 10</option>
      </select>
      <input type='search' className='search' placeholder='Search By INVOICE NO.'/>
    </div>
      </div>

      <div className='row'>
        <div className='col'>
            <table className='table' id='tablexll'>
                <tr>
                    <th>INVOICE NO.</th>
                    <th>CUSTOMER NAME</th>
                    <th>PHONE/EMAIL</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>BALANCE</th>
                    <th>STAFF</th>
                    <th>DATE</th>
                    <th>PAY DUE</th>
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
                </tr>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Creditors
