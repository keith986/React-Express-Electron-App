import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import $ from 'jquery'

const POS = () => {
  const [isProd, setIsProd] = useState(null)
  const [iscart, setIsCart] = useState(null)

  useEffect(() => {
    axios.get('/getproducts')
         .then((result) => {
           if(result.data.error){
             toast.error(result.data.error)
           }
            setIsProd(result.data)
         })
         .catch((error) => {
          toast.error(error)
         })
  }, [isProd])

  const handleClick = () => {
    const isselected = document.getElementById('selectvalue').value;
    axios.post('/addcart', {isselected})
    .then((result) => {
     if(result.data.success){
      toast.success('Added to cart')
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
             var amount = grand_total + discount;
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
    $('#grand-total').val(sum)
    var grand_total = parseFloat($('#grand-total').val());
    var discount_percent = parseFloat($('#discount').val())
    var discount = parseFloat((discount_percent * grand_total) / 100);
    var amount = grand_total + discount;
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
    var grand_total = parseFloat($('#grand-total').val());
    var discount = parseFloat((e.target.value * grand_total) / 100);
    var amount = grand_total + discount;
     $('#amount').val(amount);
  }

  return (
    <div className='container-fluid'>
    <h2>CART</h2>
   
      <div className='row'>
        <h5 className='name'>Customer Name <i>*Optional [Required for credit Sales]*</i></h5>
        <h5 className='name'>Customer Email <i>*Optional [Required for credit Sales]*</i></h5>
      </div>
      <div className='row'>
        <input type='text' className='names-input' placeholder='Optional [Required for credit Sales]'/>
        <input type='text' className='names-input' placeholder='Optional [Required for credit Sales]'/>
      </div>
        <div className='row'>
        <h5 className='name'>Customer Phone <i>*Optional [Required for credit Sales]*</i></h5>
        <h5>select product</h5>
        </div>
        <div className='row'>
        <input type='number' className='names-input' placeholder='Optional [Required for credit Sales]'/>
        <select className='names-input' id='selectvalue'>
            <option>Choose..</option>
            {!!isProd && isProd.map((stri) => {
                return (
                    <option value={`${stri._id}`}>{stri.name} [{stri.categories}]</option>
                       )
                })
              }
        </select>
      </div>
      <div className='row'>
        <button type='button' className='names-input' id='add-cart' onClick={handleClick}>Add Cart</button>
      </div>
     
      <div className='row'>
      <div className='col'>
        <table className='table'>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>TOTAL</th>
            </tr>
            <tr className='tr-row' id='mytable'>
            </tr>
                {!!iscart && iscart.map((data) => {
                  
                 var items = data.item;

                  var detail = items.map((itm) => {
                    
                  return (
                          <tr className='tr-row' id={itm._id}>
                              <td>{itm.name}</td>
                              <td className='itm-qty' id={itm._id} contentEditable={true} onInput={quantityChange}>1</td>
                              <td id={`selling-${itm._id}`}>{itm.sellingprice}</td>
                              <td id={`ttl-${itm._id}`} className='ttl'>{itm.sellingprice}</td>
                              <td>
                                <i className='bi bi-trash-fill' id={data._id} style={{color: 'red', cursor : 'pointer'}} onClick={handleDelete}></i>
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
      <div className='row' id='jump'>
        <h4>Grand Total</h4>
        <input type='number' className='names-input' id='grand-total' placeholder='0.00' readOnly/>
      </div>
      <div className='row' id='jump'>
        <h4>Discount (%)</h4>
        <input type='number' className='names-input' id='discount' placeholder='0.00' onChange={discountChange}/>
      </div>
      <div className='row' id='jump'>
        <h4>Payment Method</h4>
        <select className='names-input'>
            <option disabled>select...</option>
            <option>POS payment</option>
            <option>Transfer payment</option>
            <option>Cash payment</option>
            <option>Cheque payment</option>
        </select>
      </div>
      <div className='row' id='jum-down'>
        <h4>Amount Rendered</h4>
        <input type='number' className='names-input' id='amount' placeholder='0.00' readOnly/>
      </div>
      <div className='row' id='jum-down'>
        <button type='button' className='generate'>GENERATE INVOICE</button>
      </div>
    </div>
  )
}

export default POS
