import React from 'react'

const POS = () => {
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
        <select className='names-input'>
            <option disabled>Choose..</option>
        </select>
      </div>
      <div className='row'>
        <button className='names-input' id='add-cart'>Add Cart</button>
      </div>
      <div className='row'>
      <div className='col'>
        <table className='table'>
            <tr>
                <th>No.</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
        </div>
      </div>
      <div className='row' id='jump'>
        <h4>Grand Total</h4>
        <input type='number' className='names-input' placeholder='0.00' readOnly/>
      </div>
      <div className='row' id='jump'>
        <h4>Discount (%)</h4>
        <input type='number' className='names-input' placeholder='0.00'/>
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
        <input type='number' className='names-input' placeholder='0.00' readOnly/>
      </div>
      <div className='row' id='jum-down'>
        <button type='button' className='generate'>GENERATE INVOICE</button>
      </div>
    </div>
  )
}

export default POS
