import React, { useEffect, useState } from 'react'
import '../App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import $ from 'jquery'

const Dashboard = () => {
   const [istoday, setIsToday] = useState(null)
   const [ismonth, setIsMonth] = useState(null)
   const [isyear, setIsYear] = useState(null)
   const [isTodayInv, setIsTodayInv] = useState(null)
   const [invoice, setInvoice] = useState(null)
   const [filterData, setFilterData] = useState(null)

   const handlefilter = (event) => {
     const resp = filterData.filter(f => f.invoiceno.includes(event.target.value))
     setInvoice(resp)
   }

   //time and date
  var dates = new Date();
  var month =  dates.getMonth() + 1;
  var dat = dates.getDate();
  var year = dates.getFullYear();

  var thee_date = dat + ' / ' + month + ' / ' + year;

  useEffect(() => {
    axios.post('/todaysale', {thee_date})
         .then((result) => {
            if(result.data.error){
               toast.error(result.data.error)
            }else{
            setIsToday(result.data)
            setIsTodayInv(result.data.length)
            }
         })
         .catch((error) => {
            toast.error(error)
         })
         
  }, [thee_date])

  useEffect(() => {
   var sum = 0;
   $('.today').each(function(){
    sum += parseFloat($(this).text()); 
   
     });
    $('#todayp').html(sum.toLocaleString("en-IN"));
 }, [istoday])

 useEffect(() => {
   axios.post('/monthsale', {month})
        .then((result) => {
           if(result.data.error){
              toast.error(result.data.error)
           }else{
           setIsMonth(result.data)
           }
        })
        .catch((error) => {
           toast.error(error)
        })
        
 }, [month])

 useEffect(() => {
  var sum = 0;
  $('.month').each(function(){
   sum += parseFloat($(this).text());  
    });
   $('#monthp').html(sum.toLocaleString("en-IN"));
}, [ismonth])

useEffect(() => {
   axios.post('/yearsale', {year})
        .then((result) => {
           if(result.data.error){
              toast.error(result.data.error)
           }else{
           setIsYear(result.data)
           }
        })
        .catch((error) => {
           toast.error(error)
        })
        
 }, [year])

 useEffect(() => {
  var sum = 0;
  $('.year').each(function(){
   sum += parseFloat($(this).text());  
    });
   $('#yearp').html(sum.toLocaleString("en-IN"));
}, [isyear])

useEffect(() => {
   axios.get('/getinvoice')
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
     <h2>User Dashboard</h2>
     <div className='row'>
        <div className='col-md-4 coin'>
            <i className='bi bi-coin'></i>
            <h3>Today Sales</h3>
            {!!istoday && istoday.map((toda) => {
                return (
                    <span className='today' style={{display: 'none'}}>{toda.paid}</span>         
                       );
              })}
           KES <span className='changes' id='todayp'></span>
        </div>
        <div className='col-md-4 cart'>
            <i className='bi bi-ban-fill'></i>
            <h3>This Month sales</h3>
            {!!ismonth && ismonth.map((mon) => {
                return (
                    <span className='month' style={{display: 'none'}}>{mon.paid}</span>         
                       );
              })}
           KES <span className='changes' id='monthp'></span>
        </div>
        <div className='col-md-4 receipt'>
            <i className='bi bi-receipt-cutoff'></i>
            <h3>This Year sales</h3>
            {!!isyear && isyear.map((yea) => {
                return (
                    <span className='year' style={{display: 'none'}}>{yea.paid}</span>         
                       );
              })}
           KES <span className='changes' id='yearp'></span>
        </div>
     </div>

     <div className='row'>
        <div className='col-md-4 ext'>
            <i className='bi bi-receipt' style={{color: "gray"}}></i>
            <h3>Today Invoices</h3>
           <span className='changes'>{!!isTodayInv && isTodayInv}</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-receipt' style={{color: "red"}}></i>
            <h3>Total Invoices</h3>
               <span className='changes'>{!!invoice && invoice.length}</span>
        </div>
       
     </div>

     <div className='row'>
     <div className='col'>
     <div className='col-divide'>
     <p>Search : </p>
     <input type='search' className='search' placeholder='Search By Order Id' onChange={handlefilter}/>
     </div>
        <h2 className='row-header'>Daily Transactions</h2>
        <table className='table' style={{background: "transparent", border: "none"}}>
        <tr>
            <th>OrderId</th>
            <th>Customer</th>
            <th>Payment</th>
            <th>Attendant</th>
            <th>Status</th>
        </tr>
            {!!invoice && invoice.map((ivn) => {
               return (
                  <tr className='tr-row'>
                     <td>{ivn.invoiceno}</td>
                     <td>{ivn.customername}</td>
                     <td>{ivn.method}</td>
                     <td>{ivn.staffname}</td>
                     <td>{ivn.status}</td>
                  </tr>
               );
            })}
       
        </table>
        </div>
     </div>

    </div>
  )
}

export default Dashboard
