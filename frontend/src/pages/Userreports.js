import React, { useEffect, useState } from 'react'
import '../App.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import $ from 'jquery'

const Report = () => {

const [isreport, setIsReport] = useState(null)
const [iscash, setIsCash] = useState(null)
const [istransfer, setIsTransfer] = useState(null)
const [isPOS, setIsPOS] = useState(null)
const [ischeque, setIsCheque] = useState(null)
const [filterData, setFilterData] = useState(null)
const [filterDatas, setFilterDatas] = useState(null)

const handlefilter = (event) => {
  const resp = filterData.filter(f => f.method.includes(event.target.value))
  setIsReport(resp)
}

const handlefilters = (event) => {
  const resp = filterDatas.filter(f => f.invoiceno.includes(event.target.value))
  setIsReport(resp)
}

useEffect(() => {
  axios.get('/userreports')
     .then((result) => {
       setIsReport(result.data);
       setFilterData(result.data);
       setFilterDatas(result.data);
     })
     .catch((error) => { 
       toast.error(error);
     })
}, [])

useEffect(() => {
  axios.get('/cashreport')
       .then((result) => {
         setIsCash(result.data);
       })
       .catch((error) => {
        toast.error(error)
       })
}, [])

useEffect(() => {
  var sum = 0;
  $('.pay').each(function(){
   sum += parseFloat($(this).text());  
    });
   $('#cashyp').html(sum + '.00');
}, [iscash])

useEffect(() => {
  axios.get('/transferreport')
       .then((result) => {
         setIsTransfer(result.data)
       })
       .catch((err) => {
        toast.error(err)
       })
}, [])

useEffect(() => {
  var sum = 0;
  $('.trans').each(function(){
   sum += parseFloat($(this).text());  
    });
   $('#transferp').html(sum + '.00');
}, [istransfer])

useEffect(() => {
  axios.get('/POSreport')
       .then((result) => {
         setIsPOS(result.data)
        })
       .catch((err) => {
        toast.error(err)
        })
}, [])

useEffect(() => {
  var sum = 0;
  $('.poss').each(function(){
   sum += parseFloat($(this).text());  
    });
   $('#posp').html(sum + '.00');
}, [isPOS])

useEffect(() => {
  axios.get('/chequereport')
       .then((result) => {
         setIsCheque(result.data)
        })
       .catch((err) => {
        toast.error(err)
        })
}, [])

useEffect(() => {
  var sum = 0;
  $('.cheq').each(function(){
   sum += parseFloat($(this).text());  
    });
   $('#cheqp').html(sum + '.00');
}, [ischeque])

  return (
    <div className='container-fluid'>
      <h2>Sales Reports</h2>
      <div className='row'>
      <div className='col-md-4 cashpay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>Cash Payment</h3>
            {!!iscash && iscash.map((cas) => {
                return (
                    <span className='pay' style={{display: 'none'}}>{cas.paid}</span>         
                       );
              })}
           KES <span className='changes' id='cashyp'></span>
        </div>
        <div className='col-md-4 transferpay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>Transfer Payment</h3>
            {!!istransfer && istransfer.map((cas) => {
                return (
                    <span className='trans' style={{display: 'none'}}>{cas.paid}</span>         
                       );
              })}
           KES <span className='changes' id='transferp'></span>
        </div>
        <div className='col-md-4 POSpay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>POS Payment</h3>
            {!!isPOS && isPOS.map((cas) => {
                return (
                    <span className='poss' style={{display: 'none'}}>{cas.paid}</span>         
                       );
              })}
           KES <span className='changes' id='posp'></span>
        </div>
        <div className='col-md-4 chequepay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            <h3>Cheque Payment</h3>
            {!!ischeque && ischeque.map((cas) => {
                return (
                    <span className='cheq' style={{display: 'none'}}>{cas.paid}</span>         
                       );
              })}
           KES <span className='changes' id='cheqp'></span>
        </div>
      </div>

      <div className='row'>
      <input type='search' className='search' placeholder='Search By Order Id' onChange={handlefilters} style={{maxWidth: '400px', margin: '5px'}}/>

        <select className='status-input' onChange={handlefilter}>
            <option value=''>All Payment</option>
            <option value='cash'>Cash Payment</option>
            <option value='transfer'>Transfer Payment</option>
            <option value='cheque'>Cheque Payment</option>
            <option value='POS'>POS Payment</option>
        </select>
    
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
