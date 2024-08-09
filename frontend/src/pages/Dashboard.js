import React, { useEffect, useState } from 'react'
import '../App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { toast } from 'react-hot-toast';
import  axios  from 'axios';
import $ from 'jquery'

const Dashboard = () => {

   const [istoday, setIsToday] = useState(null)
   const [istodayInv, setIsTodayInv] = useState(null)
   const [isexpired, setIsExpired] = useState(null)
   const [issuppliers, setIsSuppliers] = useState(null)
   const [isInv, setIsInv] = useState([])
   const [currentMonth, setCurrentMonth] = useState(null)
   const [threeMonth, setThreeMonth] = useState(null)
   const [sixMonth, setSixMonth] = useState(null)
   const [isusers, setIsUsers] = useState(null)
   const [lastYear, setLastYear] = useState(null)
   const [currentYear, setCurrentYear] = useState(null)
   const [isstore, setIsStore] = useState(null)
   const [filterData, setFilterData] = useState(null)

   const handlefilter = (event) => {
     const resp = filterData.filter(f => f.invoiceno.includes(event.target.value))
     setIsInv(resp)
   }

    //time and date
  var dates = new Date();
  var month =  dates.getMonth() + 1;
  var dat = dates.getDate();
  var year = dates.getFullYear();

  var thee_date = dat + ' / ' + month + ' / ' + year;

   useEffect(() => {
      axios.post('/todaySales', {thee_date})
           .then((result) => {
           
            if(result.data.error){
               toast.error(result.data.error)
            }

              setIsToday(result.data)

            })
           .catch((err) => {
            toast.error(err)
           })
   }, [thee_date])

   useEffect(() => {
      axios.post('/todayInvoices', {thee_date})
           .then((result) => {
           
            if(result.data.error){
               toast.error(result.data.error)
            }

              setIsTodayInv(result.data.length)

            })
           .catch((err) => {
            toast.error(err)
           })
   }, [thee_date])

   useEffect(() => {
      var sum = 0;
      $('.today').each(function(){
       sum += parseFloat($(this).text());  
        });
       $('#todayp').html(sum.toLocaleString());
    }, [istoday])

   useEffect(() => {
      axios.get('/getproducts')
           .then((result) => {
              setIsExpired(result.data)
           })
           .catch((error) => {
            toast.error(error)
           })
   }, [])

   useEffect(() => {
       var co_unt = $('.exp').length
       $('#expired').html(co_unt);
    }, [])

   useEffect(() => {
    axios.get('/getsuppliers')
         .then((result) => {
            setIsSuppliers(result.data.length)
          })
         .catch((err) => {
           toast.error(err)
          })
   }, [issuppliers])

   useEffect(() => {
      axios.post('/totalinvoices')
           .then((result) => {
              setIsInv(result.data)
              setFilterData(result.data)
            })
           .catch((err) => {
            toast.error(err)
           })
   }, [])

//pagination
const [currentPage, setCurrentPage] = useState(1)
const rowPerPage = 10;
const lastIndex = rowPerPage * currentPage
const firstIndex = lastIndex - rowPerPage
const records = isInv.slice(firstIndex, lastIndex)
const nPage = Math.ceil(isInv.length / rowPerPage)
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

   useEffect(() => {
      axios.post('/currentmonth', {month})
           .then((result) => {
            if(result.data.error){
               toast.error(result.data.error)
            }
             setCurrentMonth(result.data)
            })
           .catch((err) => {
            toast.error(err)
           })
   }, [month])

   useEffect(() => {
      var sum = 0;
      $('.mon').each(function(){
       sum += parseFloat($(this).text());  
        });
       $('#month').html(sum.toLocaleString());
   }, [currentMonth])

   useEffect(() => {
      axios.post('/lastthreemonth', {month:month})
           .then((result) => {
            if(result.data.error){
               toast.error(result.data.error)
            }
             setThreeMonth(result.data)
            })
           .catch((err) => {
            toast.error(err)
           })
   }, [month])

   useEffect(() => {
      var sum = 0;
      $('.threemon').each(function(){
       sum += parseFloat($(this).text());  
        });
       $('#threemonth').html(sum.toLocaleString());
   }, [threeMonth])

   useEffect(() => {
      axios.post('/lastsixmonth', {month:month})
           .then((result) => {
            if(result.data.error){
               toast.error(result.data.error)
            }
             setSixMonth(result.data)
            })
           .catch((err) => {
            toast.error(err)
           })
   }, [month])

   useEffect(() => {
      var sum = 0;
      $('.sixmon').each(function(){
       sum += parseFloat($(this).text());  
        });
       $('#sixmonth').html(sum.toLocaleString());
   }, [sixMonth])

   useEffect(() => {
      axios.get('/users')
           .then((result) => {
             if(result.data.error){
               toast.error(result.data.error)
             }
             setIsUsers(result.data.length)
           })
           .catch(err => toast.error(err))
   }, [isusers]) 

   useEffect(() => {
   axios.post('/lastyearsales', {year})
        .then((result) => {
         if(result.data.error){
            toast.error(result.data.error)
         }
          setLastYear(result.data)
         })
        .catch((err) => {
         toast.error(err)
        })
   }, [year])

   useEffect(() => {
   var sum = 0;
   $('.lastyear').each(function(){
    sum += parseFloat($(this).text());  
     });
    $('#lastyear').html(sum.toLocaleString());
   }, [lastYear])

   useEffect(() => {
   axios.post('/currentyearsales', {year})
        .then((result) => {
         if(result.data.error){
            toast.error(result.data.error)
         }
          setCurrentYear(result.data)
         })
        .catch((err) => {
         toast.error(err)
        })
   }, [year])

   useEffect(() => {
   var sum = 0;
   $('.currentyear').each(function(){
    sum += parseFloat($(this).text());  
     });
    $('#currentyear').html(sum.toLocaleString());
   }, [currentYear])

   useEffect(()=>{
   axios.get('/storeData')
        .then((result) => {
          if(result.data.error){
            toast.error(result.data.error)
          }
          setIsStore(result.data.length)
        })
        .catch(err => console.log(err))
   }, [isstore])

  return (
    <div className='container-fluid'>
     <h2>Admin Dashboard</h2>
     <div className='row'>
        <div className='col-md-4 coin'>
            <i className='bi bi-coin'></i>
            {!!istoday ? istoday.map((toda) => {
                return (
                    <span className='today' style={{display: 'none'}}>{toda.paid}</span>         
                       );
              })
              : 
              <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>
              }
            <h3>Today Sales</h3>
           KES <span className='changes' id='todayp'></span>
        </div>
        <div className='col-md-4 ban'>
            <i className='bi bi-ban-fill'></i>
            {!!isexpired ? isexpired.map((exp) => {
               if(exp.quantity === '0'){
                  var expr = <span className='exp' style={{display: 'none'}}>{exp.quantity}</span>;   
               }
                return expr;
              })
              :
              <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>
              }
            <h3>Expired</h3>
           <span className='changes' id='expired'></span>
        </div>
        <div className='col-md-4 receipt'>
            <i className='bi bi-receipt-cutoff'></i>
            {!!istodayInv ? '' : <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>}
            <h3>Today Invoice</h3>
               <span className='changes'>{!!istodayInv ? istodayInv : <span style={{margin: '5px', fontSize : '16px'}}>0</span>}</span>
        </div>
     </div>

     <div className='row'>
        <div className='col-md-4 ext'>
            <i className='bi bi-truck-flatbed' style={{color: "blue"}}></i>
            <h3>Suppliers</h3>
           <span className='changes'>{!!issuppliers ? issuppliers : <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>}</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-receipt' style={{color: "red"}}></i>
            <h3>Total Invoice</h3>
               <span className='changes'>{!!isInv ? isInv.length : <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>}</span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-credit-card-fill' style={{color: "purple"}}></i>
            {!!currentMonth ? currentMonth.map((mon) => {
               return (
                    <span className='mon' style={{display: 'none'}}>{mon.paid}</span>         
                       );
              })
              :<span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>
              }
            <h3>Current Month Sales</h3>
           KES <span className='changes' id='month'></span>
        </div>
     </div>

     <div className='row'>
        <div className='col-md-4 ext'>
            <i className='bi bi-piggy-bank-fill' style={{color: "blueviolet"}}></i>
            {!!threeMonth ? threeMonth.map((threemon) => {
               return (
                    <span className='threemon' style={{display: 'none'}}>{threemon.paid}</span>         
                       );
              }):<span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>}
            <h3>Last 3 month sales</h3>
           KES <span className='changes' id='threemonth'></span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-grid-3x3-gap-fill'></i>
            {!!sixMonth ? sixMonth.map((sixmon) => {
               return (
                    <span className='sixmon' style={{display: 'none'}}>{sixmon.paid}</span>         
                       );
              }):<span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>}
            <h3>Last 6 month sales</h3>
           KES <span className='changes' id='sixmonth'></span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-people-fill' style={{color: "orange"}}></i>
            <h3>Users</h3>
               <span className='changes'>{!!isusers ? isusers :<span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>}</span>
        </div>
     </div>

     <div className='row'>
        <div className='col-md-4 ext'>
            <i className='bi bi-wallet2' style={{color: "maroon"}}></i>
            {!!lastYear ? lastYear.map((last) => {
               return (
                    <span className='lastyear' style={{display: 'none'}}>{last.paid}</span>         
                       );
              }) :<span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>}
            <h3>Last Year Sales</h3>
           KES <span className='changes' id='lastyear'></span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-wallet-fill' style={{color:"green"}}></i>
            {!!currentYear ? currentYear.map((cur) => {
               return (
                    <span className='currentyear' style={{display: 'none'}}>{cur.paid}</span>         
                       );
              }):<span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>}
            <h3>Current Year Sales</h3>
           KES <span className='changes' id='currentyear'></span>
        </div>
        <div className='col-md-4 ext'>
            <i className='bi bi-shop'></i>
            <h3>Stores</h3>
               <span className='changes'>{!!isstore ? isstore :<span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>}</span>
        </div>
     </div>

     <div className='row'>
     <div className='col'>
     <div className='col-divide'>
     <p>Search : </p>
     <input type='search' className='search' placeholder='Search By Order Id' onChange={handlefilter}/>
     </div>
        <h2 className='row-header'>Daily Transactions</h2>
        <table className='table'>
        <tr>
            <th>OrderId</th>
            <th>Customer</th>
            <th>Payment</th>
            <th>Attendant</th>
            <th>Status</th>
        </tr>
            {!!records 
            ?!!records && records.map((ivn) => {
               return (
                  <tr className='tr-row'>
                     <td>{ivn.invoiceno}</td>
                     <td>{ivn.customername}</td>
                     <td>{ivn.method}</td>
                     <td>{ivn.staffname}</td>
                     <td>{ivn.status}</td>
                  </tr>
               );
            }) :<span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>}
       
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

export default Dashboard
