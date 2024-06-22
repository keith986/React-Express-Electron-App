import React from 'react'
import '../App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


const Dashboard = () => {

  return (
    <div className='container-fluid'>
     <h2>Admin Dashboard</h2>
     <div className='row'>
        <div className='col-md-4 coin'>
            <i className='bi bi-coin'></i>
            <h3>Today Sales</h3>
           KES <span className='changes'>0.00</span>
        </div>
        <div className='col-md-4 ban'>
            <i className='bi bi-ban-fill'></i>
            <h3>Expired</h3>
               <span className='changes'>0</span>
        </div>
        <div className='col-md-4 receipt'>
            <i className='bi bi-receipt-cutoff'></i>
            <h3>Today Invoice</h3>
               <span className='changes'>0</span>
        </div>
        <div className='col-md-4 cart'>
             <i className='bi bi-cart4'></i>
             <h3>Products</h3>
                <span className='changes'>0</span>
        </div>
     </div>

     <div className='row'>
        <div className='col-md-4 ext'>
            <i className='bi bi-truck-flatbed' style={{color: "blue"}}></i>
            <h3>Suppliers</h3>
           <span className='changes'>0</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-receipt' style={{color: "red"}}></i>
            <h3>Total Invoice</h3>
               <span className='changes'>0</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-credit-card-fill' style={{color: "purple"}}></i>
            <h3>Current Month Sales</h3>
               KES<span className='changes'>0.00</span>
        </div>
     </div>

     <div className='row'>
        <div className='col-md-4 ext'>
            <i className='bi bi-piggy-bank-fill' style={{color: "blueviolet"}}></i>
            <h3>Last 3 month sales</h3>
               KES<span className='changes'>0.00</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-grid-3x3-gap-fill'></i>
            <h3>Last 6 month sales</h3>
               KES<span className='changes'>0.00</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-people-fill' style={{color: "orange"}}></i>
            <h3>Users</h3>
               <span className='changes'>0</span>
        </div>
     </div>

     <div className='row'>
        <div className='col-md-4 ext'>
            <i className='bi bi-wallet2' style={{color: "maroon"}}></i>
            <h3>Last Year Sales</h3>
               KES<span className='changes'>0.00</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-wallet-fill' style={{color:"green"}}></i>
            <h3>Current Year Sales</h3>
               KES<span className='changes'>0.00</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-shop'></i>
            <h3>Stores</h3>
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
