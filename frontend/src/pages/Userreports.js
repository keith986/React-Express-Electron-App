import React, { useEffect, useState } from 'react'
import '../App.css'
import toast from 'react-hot-toast'
import axios from 'axios'

const Report = () => {

const [isreport, setIsReport] = useState(null)

useEffect(() => {
  axios.get('/userreports')
     .then((result) => {
      console.log(result.data)
       setIsReport(result.data)
     })
     .catch((error) => {
      toast.error(error)
     })
}, [])

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
            
                    {!!isreport && isreport.map((port) => {
                     
                         return (
                           <tr className='tr-row'>
                            <td>{port.invoiceno}</td>
                            <td>{port.customername}</td>
                            <td>{port.customerphone} / {port.customeremail}</td>
                            <td>{port.grandtotal}</td>
                            <td>{port.discount}</td>
                            <td>{port.totalamount}</td>
                            <td>{port.paid}</td>
                            <td>{port.method}</td>
                           </tr>
                               );
                      
                    })}
                
            </table>
        </div>
      </div>

    </div>
  )
}

export default Report
