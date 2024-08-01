import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import $ from 'jquery'
import { io } from "socket.io-client";
import { UserContext } from '../context/userContext'


const POS = () => {
  const {user} = useContext(UserContext);

  const [isProd, setIsProd] = useState(null)
  const [iscart, setIsCart] = useState(null)
  const [isDiscount, setIsDiscount] = useState(null)
  const [isInvoice, setIsInvoice] = useState({
    customername : '',
    customeremail : '',
    customerphone : '',
    payment : '',
    paid : ''
  })
  const [socket, setSocket] = useState(null)
  const [filterDatas, setFilterDatas] = useState(null)

  useEffect(() => {
    axios.get('/getproducts')
         .then((result) => {
           if(result.data.error){
             toast.error(result.data.error)
           }
            setIsProd(result.data)
            setFilterDatas(result.data)
         })
         .catch((error) => {
          toast.error(error)
         })
  }, [])

  const handlefilter = (event) => {
    const resp = filterDatas.filter(s => s.name.includes(event.target.value))
    setIsProd(resp)
 }

  const handleClick2 = (e) => {
    const isselected = e.target.value; 
    
    axios.post('/addcart', {isselected})
         .then((result) => {
             if(result.data.success){
                toast.success('Added to cart')
               }
            if(result.data.error){
              toast.error(result.data.error)
            }
          })
         .catch((error) => {
               toast.error(error)
          }) 
  
  }

  useEffect( () => {
    axios.get('/getcart')
         .then((result) => {
          var datas = result.data;
     
            setIsCart(datas)
            var sum = 0;
            $('.ttl').each(function(){
             sum += parseFloat($(this).text());  
              });
             $('#grand-total').val(sum)
             var grand_total = parseFloat($('#grand-total').val());
             var discount_percent = parseFloat($('#discount').val())
             var discount = parseFloat((discount_percent * grand_total) / 100);
             var amount = grand_total - discount;
              $('#amount').val(amount);
              
          })
         .catch((error) => {
           toast.error(error)
          })  
  }, [iscart]) 

  const quantityChange = (event) => {
    const sellingprice = document.getElementById('selling-' + event.target.id).innerHTML;
    document.getElementById('ttl-' + event.target.id).innerHTML = sellingprice * event.target.innerHTML;
    
    var sum = 0;
   $('.ttl').each(function(){
    sum += parseFloat($(this).text());  
     });
    $('#grand-total').val(sum);

    var grand_total = parseFloat($('#grand-total').val());
    var discount_percent = parseFloat($('#discount').val())
    var discount = parseFloat((discount_percent * grand_total) / 100);
    var amount = grand_total - discount;
    $('#amount').val(amount);

  }

  const handleDelete = (event) => {
    const itemId = event.target.id;
    axios.post('/deleteone', {itemId})
         .then((result) => {
           if(result.data.success){
             toast.success('Deleted')
           }
         })
         .catch((error) => {
           toast.error(error)
         })
  }

  const handleDeleteMany = (event) => {
  
    axios.post('/deletemany')
         .then((result) => {
           if(result.data.success){
             toast.success('Deleted All')
           }
         })
         .catch((error) => {
           toast.error(error)
         })
  }

  const discountChange = (e) => {
    setIsDiscount(e.target.value)
    var grand_total = parseFloat($('#grand-total').val());
    var discount = parseFloat((e.target.value * grand_total) / 100);
    var amount = grand_total - discount;
    $('#amount').val(amount);
  }

  const handleChange = (e) => {
    setIsInvoice({...isInvoice, [e.target.name] : [e.target.value]})
  }

  useEffect(() => {

    setSocket(io('http://localhost:4000', {
      auth : {
        token : !!user && user._id
      }
    }))

  },[user])

  const submitChange = async (e) => {
    e.preventDefault();

    var grandtotal = $('#grand-total').val();
    var amount = $('#amount').val();

    //cart's table
    var tabl = document.getElementById('cart-table');
    var info = [];
    var headers = [];

    for(let i = 0; i < tabl.rows[0].cells.length; i++){
      headers.push(tabl.rows[0].cells[i].innerHTML);
    }

    for(let i = 1; i < tabl.rows.length; i++){
      var rowData = {};
      for(let j = 0; j < tabl.rows[i].cells.length; j++){
         rowData[headers[j]] = tabl.rows[i].cells[j].innerHTML;
      }
      info.push(rowData);
    }

    //time and date
        var dates = new Date();
        var month =  dates.getMonth() + 1;
        var dat = dates.getDate();
        var year = dates.getFullYear();

        var min = dates.getMinutes();
        var hrs = dates.getHours();
        var sec = dates.getSeconds();
        var session = 'am';

        if(hrs >= 12){
            hrs = hrs - 12;
            session = 'pm';
        }

        if(min < 10){
            min  = '0' + min;
        }

        if(sec < 10){
            sec = '0' + sec;
        }

        var thee_date = dat + ' / ' + month + ' / ' + year;
        var thee_time = hrs + ' : ' + min + ' : ' + sec +  ' ' + session;

    axios.post('/invoice', {isInvoice, isDiscount, info, grandtotal, amount, thee_time, thee_date, month, year})
         .then((result) => {
           if(result.data.success){  
            socket.emit("newnotification", {msg : 'new invoice', adminId : !!user && user.adminId, result : result.data.success});
            toast.success('Invoice Successfully Generated!');
           }
           if(result.data.error){
            toast.error(result.data.error)
           }
          })
         .catch(error => {
          toast.error(error)
         })
  }


  return (
    <div className='container-fluid'>
    
    <form onSubmit={submitChange}>
    <div className='cartright'>
      <div className='row'>
        <h5 className='name'>Customer Name <i>*Optional*</i></h5>
        <h5 className='name'>Customer Email <i>*Optional*</i></h5>
      </div>
      <div className='row'>
        <input type='text' className='names-input' name='customername' placeholder='Optional [Required for credit Sales]' onChange={handleChange}/>
        <input type='text' className='names-input' name='customeremail' placeholder='Optional [Required for credit Sales]' onChange={handleChange}/>
      </div>
        <div className='row'>
        <h5 className='name'>Customer Phone <i>*Optional*</i></h5>
      </div>
        <div className='row'>
        <input type='number' className='names-input' name='customerphone' placeholder='Optional [Required for credit Sales]' onChange={handleChange}/> 
      </div>       
      <div className='row'>
      <div className='col'>
        <table className='table' id='cart-table' style={{background: "transparent", border: "none"}}>
            <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
            
                {!!iscart && iscart.map((data) => {
                  var items = data.item;
                  
                  var detail = items.map((itm) => {
                    
                  return (
                          <tr className='tr-row' id={itm._id}>
                          <td><img src={itm.prd_img} alt='product_image' width="50px" height="50px"  style={{borderRadius: "50%"}}/></td>      
                              <td>{itm.name}</td>
                              <td className='itm-qty' id={itm._id} contentEditable={true} onInput={quantityChange}>1</td>
                              <td id={`selling-${itm._id}`}>{itm.sellingprice}</td>
                              <td id={`ttl-${itm._id}`} className='ttl'>{itm.sellingprice}</td>
                              <td>
                                <i className='bi bi-trash-fill' title='delete' id={data._id} style={{color: 'red', cursor : 'pointer'}} onClick={handleDelete}></i>
                              </td>
                          </tr>
                         );
                  
                  });  

                  return detail;        
                                                })                         
                }
             
        </table>
        <button className='deleteall' onClick={handleDeleteMany}><i className='bi bi-trash-fill'></i> DELETE ALL</button>
        </div>
      </div>
    </div>
    <div className='product-list'>
      <h2>Select Product</h2>
      <input type='search' style={{width: '100%', padding : '7px', borderRadius : '50px', margin: '5px'}} placeholder='Search for product by name' onChange={handlefilter}/>
      <div className='list-dropdown'>
      {!!isProd && isProd.map((stri) => {
                return (
                    <button type='button'  value={`${stri._id}`} onClick={handleClick2} style={{width: '100%', padding : '20px', margin : '2px', background : 'gray', color : '#fff', border: 'none', boxShadow : '0px 0px 2px 1px black', cursor: 'pointer'}}>{stri.name} [{stri.categories}]  {stri.sellingprice}</button>
                       )
                })
      }
      </div>
    </div>
    <div className='cash-out'>
      <div className='row' id='jump'>
       KES. <input type='number' className='names-input' id='grand-total' name='grandtotal' placeholder='0.00' readOnly style={{border: "none", outline : "none", background : "transparent", fontSize : "30px", width: '100%'}}/>
      </div>
      <div className='row' id='jump'>
        <h4>Discount (%)</h4>
        <input type='number' className='names-input' id='discount' placeholder='0.00' onChange={discountChange} required/>
      </div>
      <div className='row' id='jump'>
        <h4>Payment Method *</h4>
        <select className='names-input' name='payment' onChange={handleChange}>
            <option >Choose</option>
            <option value='transfer'>Transfer payment</option>
            <option value='cash'>Cash payment</option>
            <option value='cheque'>Cheque payment</option>
        </select>
      </div>
      <div className='row' id='jum-down'>
        <h4>Amount Payable</h4>
        <input type='number' className='names-input' id='amount' name='amount' placeholder='0.00' readOnly/>
      </div>
      <div className='row' id='jum-down'>
        <h4>Amount Paid *</h4>
        <input type='number' className='names-input' id='amount' name='paid' placeholder='0.00' onChange={handleChange} required/>
      </div>
      <div className='row' id='jum-down'>
        <button type='submit' className='generate' style={{position: "absolute", bottom : "5%", width : "90%", borderRadius : "5px", background : "green", padding : '20px', fontSize : "20px"}}>PAY OUT</button>
      </div>
    </div>
    </form>
    </div>
  );

}

export default POS
