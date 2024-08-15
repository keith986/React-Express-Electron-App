import React, { useEffect, useState } from 'react'
import '../App.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import $ from 'jquery'

const Report = () => {
const [isreport, setIsReport] = useState([])
const [iscash, setIsCash] = useState(null)
const [istransfer, setIsTransfer] = useState(null)
const [ischeque, setIsCheque] = useState(null)
const [filterData, setFilterData] = useState([])
const [filterDatas, setFilterDatas] = useState([])

const handlefilter = (event) => {
  const resp = filterData.filter(f => f.method.includes(event.target.value))
  setIsReport(resp)
}

const handlefilters = (event) => {
  const resp = filterDatas.filter(f => f.invoiceno.includes(event.target.value))
  setIsReport(resp)
}

useEffect(() => {
  axios.post('/totalinvoices')
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
  axios.get('/allcashreport')
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
   $('#cashyp').html(sum.toLocaleString());
}, [iscash])

useEffect(() => {
  axios.get('/alltransferreport')
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
   $('#transferp').html(sum.toLocaleString());
}, [istransfer])


useEffect(() => {
  axios.get('/allchequereport')
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
   $('#cheqp').html(sum.toLocaleString());
}, [ischeque])

//pagination
const [currentPage, setCurrentPage] = useState(1)
const rowPerPage = 7
const lastIndex = rowPerPage * currentPage
const firstIndex = lastIndex - rowPerPage
const records = isreport.slice(firstIndex, lastIndex)
const nPage = Math.ceil(isreport.length / rowPerPage)
const numbers = [...Array(nPage + 1).keys()].slice(1)

const handlePrev = () => {
  if(currentPage !== 1){
    return setCurrentPage(currentPage - 1)
  }else{
    return setCurrentPage(1)
  }
}

const handleNext = () => {
  if(currentPage !== nPage){
     setCurrentPage(currentPage + 1)
  }else{
     setCurrentPage(nPage)
  }
}

function handlePage (id) {
   setCurrentPage(id)
}

  return (
    <div className='container-fluid'>
      <h2>Sales Reports</h2>
      <div className='row'>
      <div className='col-md-4 cashpay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            {!!iscash ? iscash.map((cas) => {
                return (
                    <span className='pay' style={{display: 'none'}}>{cas.paid}</span>         
                       );
              })
              :
              <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>
              }
            <h3>Cash Payment</h3>
           KES <span className='changes' id='cashyp'></span>
        </div>
        <div className='col-md-4 transferpay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            {!!istransfer ? istransfer.map((cas) => {
                return (
                    <span className='trans' style={{display: 'none'}}>{cas.paid}</span>         
                       );
              })
              :
              <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>
              }
            <h3>Transfer Payment</h3>
           KES <span className='changes' id='transferp'></span>
        </div>
        <div className='col-md-4 chequepay'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            {!!ischeque ? ischeque.map((cas) => {
                return (
                    <span className='cheq' style={{display: 'none'}}>{cas.paid}</span>         
                       );
              })
              :
              <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>
              }
            <h3>Cheque Payment</h3>
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
                    <th>ATTENDANT</th>
                    <th>PAYMENT</th>
                </tr>
            
                    {!!records && records.map((port) => {
                     
                         return (
                           <tr className='tr-row'>
                            <td>{port.invoiceno}</td>
                            <td style={{fontSize : '16px'}}>{port.customername}</td>
                            <td style={{fontSize : '16px'}}>{port.customerphone} / {port.customeremail}</td>
                            <td>{port.grandtotal}</td>
                            <td>{port.discount}</td>
                            <td>{port.totalamount}</td>
                            <td>{port.paid}</td>
                            <td>{port.staffname}</td>
                            <td>{port.method}</td>
                           </tr>
                               );
                      
                    })}
                
            </table>
        </div>
      </div>

      <div className='row'>
      <nav className='page-nav'>
        <ul className='pagination'>
         
          <li className='page-item'>
            <button onClick={handlePrev}>Prev</button>
          </li>

          {!!numbers && numbers.map((n, i) => {
            return (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                  <button onClick={() => handlePage(n)}>{n}</button>
                </li>
                   );
          })}

          <li className='page-item'>
            <button onClick={handleNext}>Next</button>
          </li>

        </ul>
      </nav> 
      </div>

    </div>
  )
}

export default Report
