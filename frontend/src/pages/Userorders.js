import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const Orders = () => {

  const [invoice, setInvoice] = useState(null)

  useEffect(() => {
    axios.get('/getinvoice')
         .then((result) => {
           setInvoice(result.data)
         })
         .catch(err => {
          toast.error(err)
         })
  }, [])

  return (
    <div className='container-fluid'>
    <h2>All Orders</h2>
      
      <div className='row'>
      <div className='col-divide'>
       <p>Search : </p>
      <input type='search' className='search' placeholder='Search By ORDER ID...'/>
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
              {!!invoice && invoice.map((inv) => {

                var pay = parseFloat((inv.grandtotal * inv.discount) / 100);
                var payable = parseFloat(inv.grandtotal - pay)              

                return (
                  <tr className='tr-row'>
                    <td>{inv._id}</td>
                    <td>{inv.customername}</td>
                    <td>{inv.customerphone}/{inv.customeremail}</td>
                    <td>{inv.grandtotal}</td>
                    <td>{inv.discount}</td>
                    <td>{payable}</td>
                    <td>{inv.paid}</td>
                    <td>{inv.method}</td>
                    <td style={{background: 'gray'}}>{inv.status}</td>
                    <td>{inv.staffname}</td>
                    <td>
                      <i className='bi bi-pencil-fill'></i>
                    </td>
                  </tr>
                      );
              })}
            </table>

          </div>
      </div>

    </div>
  )
}

export default Orders
