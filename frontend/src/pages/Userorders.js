import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const Orders = () => {

  const [invoice, setInvoice] = useState(null)
  const [isModal, setIsModal] = useState(false)

  const handleClick = () => {
    setIsModal(true)
  }

  const handleClose = () => {
    setIsModal(false)
  }

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
     <div className={`${isModal ? "background" : ""}`}></div>
    <h2>All Orders</h2>

  <div className={`modal ${isModal ? "edit" : ""}`}>
        <div className='modal-dialog'>
        <form>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 style={{color: 'green'}}>Complete Payment</h2>
              <i className='bi bi-coin' style={{color: 'green'}}></i>
            </div>
            <div className='modal-body'>
            <span className='name'>Enter Creditor's Balance</span>
            <input type='number' className='name-input' name='name' placeholder='Enter Amount...'/>
            </div>
            <div className='modal-footer'>
            <span>.</span>
            <button type='button' className='back' onClick={handleClose}>Back</button>
            <button type='submit' className='send'>Update Payment</button>
            </div>

          </div>
          </form>
        </div>
      </div>

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

                             

                return (
                  <tr className='tr-row'>
                    <td>{inv._id}</td>
                    <td>{inv.customername}</td>
                    <td>{inv.customerphone}/{inv.customeremail}</td>
                    <td>{inv.grandtotal}</td>
                    <td>{inv.discount}</td>
                    <td>{inv.totalamount}</td>
                    <td>{inv.paid}</td>
                    <td>{inv.method}</td>
                    <td style={{background: 'gray'}}>{inv.status}</td>
                    <td>{inv.staffname}</td>
                    <td>
                      <i className='bi bi-pencil-fill' style={{cursor : 'pointer'}} onClick={handleClick}></i>
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
