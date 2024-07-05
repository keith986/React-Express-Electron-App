import React from 'react'
import '../App.css'

const Report = () => {
  return (
    <div className='container-fluid'>
      <h2>Sales Reports</h2>
      <div className='row'>
      <div className='col-md-4 cashpay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>Cash Payment</h3>
           KES <span className='changes'>0.00</span>
        </div>
        <div className='col-md-4 transferpay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>Transfer Payment</h3>
           KES <span className='changes'>0.00</span>
        </div>
        <div className='col-md-4 POSpay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>POS Payment</h3>
           KES <span className='changes'>0.00</span>
        </div>
        <div className='col-md-4 chequepay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>Cheque Payment</h3>
           KES <span className='changes'>0.00</span>
        </div>
      </div>

      <div className='row'>
      <span>FROM: <input type='date' className='date-input'/></span>
        <span>TO: <input type='date' className='date-input'/></span>
        <select className='status-input'>
            <option>All Payment</option>
            <option>Cash Payment</option>
            <option>Transfer Payment</option>
            <option>Cheque Payment</option>
            <option>POS Payment</option>
        </select>
        <button type='button' className='search-btn'><i className='bi bi-search'></i> Search</button>
      </div>

      <div className='row'>
        <div className='col'>
        <table className='table' id='tablexlg'>
                <tr>
                    <th>ORDERID</th>
                    <th>CUSTOMER</th>
                    <th>PHONE/EMAIL</th>
                    <th>TOTAL</th>
                    <th>DISCOUNT(%)</th>
                    <th>PAYABLE</th>
                    <th>PAID</th>
                    <th>PAYMENT</th>
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

export default Report
