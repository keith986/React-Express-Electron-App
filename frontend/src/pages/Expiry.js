import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import $ from 'jquery'

const Expiry = () => {

  const [filterDatas, setFilterDatas] = useState([]) 
  const [isProd, setIsProd] = useState([])

  const handlefilter = (event) => {
    const respo = filterDatas.filter(s => s.name.includes(event.target.value))
    setIsProd(respo)
  }

  useEffect(() => {
    axios.get('/getproducts')
         .then((result) => {
            setIsProd(result.data)
            setFilterDatas(result.data)
         })
         .catch((error) => {
          toast.error(error)
         })
  }, [])

  useEffect(() => {
    var to_day = $('.today').length;
    $('#today').html(to_day)
  }, [isProd])

  useEffect(() => {
    var se_ven = $('.seven').length;
    $('#seven').html(se_ven)
  }, [isProd])

  useEffect(() => {
    var mo_nth = $('.month').length;
    $('#month').html(mo_nth)
  }, [isProd])

  useEffect(() => {
    var three_month = $('.threemonth').length;
    $('#threemonth').html(three_month)
  }, [isProd])

  //pagination
const [currentPage, setCurrentPage] = useState(1)
const rowPerPage = 10
const lastIndex = rowPerPage * currentPage
const firstIndex = lastIndex - rowPerPage
const records = isProd.slice(firstIndex, lastIndex)
const nPage = Math.ceil(isProd.length / rowPerPage)
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
      <h2>Expiration Notification</h2>
      <div className='row'>
      <div className='col-md-4 todayexp'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            {!!isProd ? isProd.map((exp) => {
              //time and date
              var dates = new Date();
              var dat = dates.getDate();
              var mont = dates.getMonth() + 1;
              var yr = dates.getFullYear();

               if(exp.edate === dat.toString()){
                if(exp.emonth === mont.toString()){
                  var expr = <span className='today' style={{display: 'none'}}>{exp.name}</span>;   
               }
               }

               if(exp.eyear === yr.toString()){
                return !expr;
               }

                return expr;
              })
              :
              <span style={{margin: '5px', fontSize : '16px', color : '#fff'}}>Loading...</span>
              }
            <h3>Expires Today</h3>
           <span className='changes' id='today'></span>
        </div>
        <div className='col-md-4 sevenexp'>
            <i className='bi bi-credit-card-2-front-fill'></i>
             {!!isProd ? isProd.map((expi) => {
              //time and date
              var dates = new Date();
              var dat = dates.getDate();
              var mon = dates.getMonth() + 1;
              var yer = dates.getFullYear();

              var sevday = expi.edate - dat;

               if(sevday === 7) {
                if(expi.eyear === yer.toString()){
                  var expr = <span className='seven' style={{display: 'none'}}>{expi.name}</span>;   
               }
               }

               if(expi.emonth !== mon.toString()){
                  return !expr;
               }

                return expr;
             })
              :
              <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>
              }
            <h3>Expires in 7 days</h3>
           <span className='changes' id='seven'></span>
        </div>
        <div className='col-md-4 monthexp'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            {!!isProd ? isProd.map((expis) => {
              //time and date
              var dates = new Date();
           //   var dat = dates.getDate();
              var mon = dates.getMonth() + 1; 
              var yer = dates.getFullYear();

              var this_mon = expis.emonth - mon;
               if(expis.eyear === yer.toString()){
                
                if(this_mon === 0){
                  var expr = <span className='month' style={{display: 'none'}}>{expis.name}</span>;   
                }
                
               }

             //  if(expis.edate !== dat.toString()){
              //    return !expr;
             //  }

               return expr;
             })
              :
              <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>
              }
            <h3>Expires this month</h3>
           <span className='changes' id='month'></span>
        </div>
        <div className='col-md-4 monthsexp'>
            <i className='bi bi-credit-card-2-front-fill'></i>
            {!!isProd ? isProd.map((expi) => {
              //time and date
              var dates = new Date();
              var dat = dates.getDate();
              var mo_n = dates.getMonth() + 1;
              var yer = dates.getFullYear();
 
              var this_mon = expi.emonth - mo_n;
              if(this_mon === 3){
               if(expi.eyear === yer.toString()){    
                  var expr = <span className='threemonth' style={{display: 'none'}}>{expi.name}</span>;                   
               }
              }

              if(expi.edate === dat.toString()){
                return !expr;
              }

                return expr;
              })
              :
              <span style={{margin: '5px', fontSize : '16px'}}>Loading...</span>
              }
            <h3>Expires in 3 months</h3>
           
           <span className='changes' id='threemonth'></span>
        </div>
      </div>

      <div className='row'>
      <div className='col-divide'>
       <p>Search : </p>
      <input type='search' className='search' placeholder='Search By Product name' onChange={handlefilter}/>
      </div>
      </div>

      <div className='row'>
        <div className='col'>
        <table className='table' id='tablexlg'>
                <tr>
                    <th>PRODUCT</th>
                    <th>STOCK QTY</th>
                    <th>SUPPLIER</th>
                    <th>EXPIRY DATE</th>
                    <th>Time Left</th>
                </tr>
                {!!records && records.map((exp) => {
                  var expr = exp;
                  var ed = expr.edate;
                  var em = expr.emonth;
                  var ey = expr.eyear;

                  //time and date
                  var dates = new Date();
                  var mon = dates.getMonth() + 1;
                  var yer = dates.getFullYear();

                  var ths_mon = expr.emonth - mon.toString();

                  var  num_year = ey - yer;

                  var numDays = new Date(expr.eyear, expr.emonth, 0).getDate()
                  var num_days = numDays - expr.edate;

                  if(num_days <= 0 && numDays <= 0){
                      return num_days === 'Expired';
                  }

                return ( 
                           <tr className='tr-row'>
                               <td>{expr.name}</td>
                               <td>{expr.quantity}</td>
                               <td>{expr.supplier}</td>
                               <td>{ey + '-' + em + '-' + ed}</td>
                               <td>{num_days + ' Days '}{ths_mon > 0 ? ths_mon + ' Months' : ''}{num_year > 0 ? num_year + ' Years' : ''}</td>
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

export default Expiry
