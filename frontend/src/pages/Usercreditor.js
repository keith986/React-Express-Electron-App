import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const Creditors = () => {

  const [invoice, setInvoice] = useState(null)
  const [filterData, setFilterData] = useState(null)

  const handlefilter = (event) => {
    const resp = filterData.filter(f => f.invoiceno.includes(event.target.value))
    setInvoice(resp)
  }

  useEffect(() => {
    axios.get('/usercreditors')
         .then((result) => {
           setInvoice(result.data)
           setFilterData(result.data)
         })
         .catch(err => {
          toast.error(err)
         })
  }, [])

  return (
    <div className='container-fluid'>
      <h2>Credit Sale Records</h2>

      <div className='row'>
      <div className='col-divide'>
       <p>Search : </p>
      <input type='search' className='search' placeholder='Search By INVOICE NO.' onChange={handlefilter}/>
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
                    <th>PAY DUE</th>
                </tr>
             
{!!invoice && invoice.map((deta) => {
 var bal = deta.totalamount - deta.paid;
 var inv = deta;

 if(bal <= 0){
   return !inv;
 }
 return  (
  <tr className='tr-row'>
    <td>{inv.invoiceno}</td>
    <td>{inv.customername}</td>
    <td>{inv.customerphone}/{inv.customeremail}</td>
    <td>{inv.totalamount}</td>
    <td>{bal}</td>
    <td>{inv.paid}</td>
    <td>{inv.staffname}</td>
    <td>
      <i className='bi bi-credit-card-2-back-fill' id={inv._id} style={{cursor : 'pointer', color: 'green', fontSize : '20px'}} ></i>
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

export default Creditors
