import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const Creditors = () => {

  const [invoice, setInvoice] = useState(null)
  const [filterData, setFilterData] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const [balId, setBalId] = useState(null)
  const [isblc, setIsBlc] = useState({
    balance : ''
  })

  const handleFilter = (event) => {
    const resp = filterData.filter(f => f.invoiceno.includes(event.target.value))
    setInvoice(resp)
  }

  const handleChange = (event) => {
    setIsBlc({...isblc, [event.target.name] : [event.target.value]})
  }

  useEffect(() => {
    axios.post('/totalinvoices')
         .then((result) => {
           setInvoice(result.data)
           setFilterData(result.data)
         })
         .catch(err => {
          toast.error(err)
         })
  }, [invoice])

  const handleClick = (event) => {
    setIsModal(true)
    setBalId(event.target.id)
  }

  const handleClose = () => {
    setIsModal(false)
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    axios.post('/userbalance', {balId, isblc})
         .then((result) => {
    
          if(result.data.success){
            toast.success('Balance Cleared!!')
          }

          if(result.data.error){
            toast.error(result.data.error)
          }

         })
         .catch((error) => {
            toast.error(error)
         })
  }

  return (
    <div className='container-fluid'>
      <h2>Credit Sale Records</h2>

      <div className={`${isModal ? "background" : ""}`}></div>

      <div className='row'>
      <form onSubmit={handleSubmit}>
      <div className={`modal ${isModal ? "open" : ""}`}>
        <div className='modal-dialog'>
        
          <div className='modal-content'>
            <div className='modal-header'>
              <h3>CLEAR BALANCE</h3>
              <i className='bi bi-receipt'></i>
            </div>
            
           <div className='modal-body'>
            <input type='number' className='name-input' id='balance' name='balance' onChange={handleChange}/> 
           </div>
            
            <div className='modal-footer' id='modal-footer'>
            <span>.</span>
            <button type='button' className='back' onClick={handleClose}>Back</button>
            <button type='submit' className='send'>PAY NOW</button>
            </div>

          </div>
  
        </div>
      </div>
      </form>

      <div className='col-divide'> 
       <p>Search : </p>
      <input type='search' className='search' placeholder='Search By INVOICE NO.' onChange={handleFilter}/>
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
    <td>{inv.paid}</td>
    <td>{bal}</td>
    <td>{inv.staffname}</td>
    <td>
      <i className='bi bi-credit-card-2-back-fill' id={inv._id} style={{cursor : 'pointer', color: 'green', fontSize : '25px'}} onClick={handleClick}></i>
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
