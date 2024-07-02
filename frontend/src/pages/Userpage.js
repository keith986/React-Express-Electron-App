import React from 'react'
import '../App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Dashboard = () => {

  return (
    <div className='container-fluid'>
     <h2>User Dashboard</h2>
     <div className='row'>
        <div className='col-md-4 coin'>
            <i className='bi bi-coin'></i>
            <h3>Today Sales</h3>
           KES <span className='changes'>0.00</span>
        </div>
        <div className='col-md-4 cart'>
            <i className='bi bi-ban-fill'></i>
            <h3>Weekly sales</h3>
               <span className='changes'>0</span>
        </div>
        <div className='col-md-4 receipt'>
            <i className='bi bi-receipt-cutoff'></i>
            <h3>Yearly sales</h3>
               <span className='changes'>0</span>
        </div>
     </div>

     <div className='row'>
        <div className='col-md-4 ext'>
            <i className='bi bi-receipt' style={{color: "gray"}}></i>
            <h3>Today Invoices</h3>
           <span className='changes'>0</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-receipt' style={{color: "red"}}></i>
            <h3>Total Invoice</h3>
               <span className='changes'>0</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-bag-fill' style={{color: "purple"}}></i>
            <h3>Available Product</h3>
               <span className='changes'>0</span>
        </div>
     </div>

     <div className='row'>
     <div className='col'>
     <div className='col-divide'>
     <select className='select'>
        <option>5 of 5</option>
        <option>10 of 10</option>
     </select>
     <input type='search' className='search' placeholder='Search By Invoice'/>
     </div>
        <h2 className='row-header'>Daily Transactions</h2>
        <table className='table'>
        <tr>
            <th>OrderId</th>
            <th>Invoice</th>
            <th>Product</th>
            <th>Payment</th>
            <th>Attendant</th>
            <th>Status</th>
        </tr>
        <tr className='tbody'>
            <td>No Entry</td>
            <td>No Entry</td>
            <td>No Entry</td>
            <td>No Entry</td>
            <td>No Entry</td>
            <td>No Entry</td>
        </tr>
        </table>
        </div>
     </div>

    </div>
  )
}

export default Dashboard
