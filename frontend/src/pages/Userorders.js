import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react'

const Orders = () => {

  const [invoice, setInvoice] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const [isreceipt, setIsReceipt] = useState(null)
  const [filterData, setFilterData] = useState(null)
  const [adminprof, setAdminProf] = useState(null)
  

  const handlefilter = (event) => {
    const resp = filterData.filter(f => f.invoiceno.includes(event.target.value))
    setInvoice(resp)
  }

  const handleClick = (e) => {
    setIsModal(true)
    axios.post('/receipts', {receiptId : e.target.id})
         .then((result) => {
           setIsReceipt(result.data)
          })
         .catch((error) => {
          toast.error(error)
          })
    
    axios.post('/admindetail')
         .then((result) => {
          console.log(result)
          setAdminProf(result.data)
         })
         .catch((err) => {
          toast.error(err.message)
         })

  }

  const handleClose = () => {
    setIsModal(false)
  }

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

  const handleDownload = () => {
    const elemHtml = document.querySelector('#receipt');
    let docPDF = new jsPDF();
    docPDF.html(elemHtml,{
      callback:function(docPDF){
          docPDF.save('receipt.pdf');
      },
  x: 15,
  y : 15,
  width: 170,
  windowWidth: 650
  })
  }

  return (
    <div className='container-fluid'>
    <h2>All Orders</h2>

    <div className={`${isModal ? "background" : ""}`}></div>

    <div className='row'>
    
    <div className={`modal ${isModal ? "open" : ""}`} id='open'>

            <div className='modal-header'>
            <button type='button'  onClick={handleClose} style={{background : "gray" , width : "10%", borderRadius : "10px", outline : "none", padding : "5px"}}>Back</button>
              <h3>Receipt</h3>
              <button type='button'  onClick={handleDownload} style={{background : "green" , width : "20%", borderRadius : "10px", outline : "none", padding : "5px"}}>Download</button>   
            </div>
            
            <div className='receipt-modal-body' id='receipt' style={{fontSize: "10px"}}>
                <h2>POStore</h2>
                <h4>{!!adminprof && adminprof.map((res) => res.companyname)}</h4>
        
                <p>{!!adminprof && adminprof.map((res) => res.companyphone)}</p>
                <p>{!!adminprof && adminprof.map((res) => res.companyemail)}</p>
                <p>{!!adminprof && adminprof.map((res) => res.companylocation)}</p>
                <br/>
                <h2>SALES INVOICE</h2>
                <p>Cashier : {!!isreceipt && isreceipt.map((inv) => {return inv.staffname})} </p>
                <p>Invoice No. : {!!isreceipt && isreceipt.map((inv) => {return inv.invoiceno})} </p>
                <p>Date : {!!isreceipt && isreceipt.map((inv) => {return inv.date})}</p>
                <p>Time : {!!isreceipt && isreceipt.map((inv) => {return inv.time})}</p>
                <br/>
                <div style={{ alignItems: 'center', alignSelf: 'center'}}>
              <table className='table' id='receipt-tbl' style={{background: "transparent", border: "none", maxWidth : "150px", fontSize: "10px"}}>
                    <tr>
                      <th>ITEM</th>
                      <th>QTY</th>
                      <th>AMOUNT</th>
                    </tr>
                    {!!isreceipt && isreceipt.map((inv) => {
                      var inv_item = inv.item;
                      
                      var itms = inv_item.map((itm) => {
                        
                        return (
                          <tr> 
                           <td style={{fontSize : "10px"}}>{itm.Item}</td>
                           <td style={{fontSize : "10px"}}>{itm.Quantity}</td>
                           <td style={{fontSize : "10px"}}>Ksh.{itm.Total}</td>
                          </tr>
                              );

                      })

                      return itms;

                    })}
                  </table>
                </div>
                <br/>
                <p>TOTAL : <strong>Ksh. {!!isreceipt && isreceipt.map((inv) => {return inv.grandtotal})}</strong></p>
                 <hr style={{width: '50%', background: 'black', padding: '1px', border: 'none'}}/>
                 <hr style={{width: '50%', background: 'black', padding: '1px', border: 'none', marginTop: '2px', marginBottom: '10px'}}/>
                <p>DISCOUNT ({!!isreceipt && isreceipt.map((inv) => {return inv.discount})} %) : {!!isreceipt && isreceipt.map((inv) => {
                 var dis_count = parseFloat((inv.discount * inv.grandtotal) / 100 )
                 return dis_count; 
                 })}
                 </p>
                 <p>PAYABLE : <strong>Ksh. {!!isreceipt && isreceipt.map((inv) => {return inv.totalamount})}</strong></p>
                 <p>PAID : <strong>Ksh. {!!isreceipt && isreceipt.map((inv) => {return inv.paid})}</strong></p>
                 <p>BALANCE : Ksh. {!!isreceipt && isreceipt.map((inv) => {
                 var bal_ance = parseFloat(inv.totalamount - inv.paid)
                 return bal_ance; 
                 })}</p>
                 <p>PAID VIA : {!!isreceipt && isreceipt.map((inv) => {return inv.method})} </p>
                 <hr style={{width: '50%', background: 'black', padding: '1px', border: 'none', marginTop: '10px'}}/>
                 <hr style={{width: '50%', background: 'black', padding: '1px', border: 'none', marginTop: '2px', marginBottom: '10px'}}/>
                 <p><strong>&copy; Copyright POStore</strong></p>
             <QRCode value={'© Copyright POStore ' + new Date().getFullYear() + ". Download Receipt from our App." }/>
            </div>

    </div>

    <div className='col-divide'>
       <p>Search : </p>
      <input type='search' className='search' placeholder='Search By ORDER ID...' onChange={handlefilter}/>
    </div>
    </div>

      <div className='row'>
      <div className='col'>
            <table className='table' id='tablext' style={{background: "transparent", border: "none"}}>
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
                <th>ATTENDANT</th>
                <th>DOWNLOAD</th>
              </tr>
              {!!invoice && invoice.map((inv) => {

                return (
                  <tr className='tr-row'>
                    <td>{inv.invoiceno}</td>
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
                      <i className='bi bi-file-earmark-arrow-down-fill' id={inv._id} style={{cursor : 'pointer', color: 'purple', fontSize : '20px'}} onClick={handleClick}></i>
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
