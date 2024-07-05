import React from 'react'
import '../App.css'

const Expiry = () => {
  return (
    <div className='container-fluid'>
      <h2>Expiration Notification</h2>
      <div className='row'>
      <div className='col-md-4 todayexp'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>Expires Today</h3>
           <span className='changes'>0</span>
        </div>
        <div className='col-md-4 sevenexp'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>Expires in 7 days</h3>
           <span className='changes'>0</span>
        </div>
        <div className='col-md-4 monthexp'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>Expires this month</h3>
           <span className='changes'>0</span>
        </div>
        <div className='col-md-4 monthsexp'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>Expires in 3 months</h3>
           <span className='changes'>0</span>
        </div>
      </div>

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
        <table className='table' id='tablexlg'>
                <tr>
                    <th>PRODUCT</th>
                    <th>STOCK QTY</th>
                    <th>SUPPLIER</th>
                    <th>EXPIRY DATE</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
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

export default Expiry
