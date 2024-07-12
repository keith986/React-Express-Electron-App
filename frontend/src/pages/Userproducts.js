import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const Products = () => {

  const [isProd, setIsProd] = useState(null)
  const [filterData, setFilterData] = useState(null) 

  const handlefilter = (event) => {
    const resp = filterData.filter(f => f.name.includes(event.target.value))
    setIsProd(resp)
  }
  
  useEffect(() => {
    axios.get('/getproducts')
         .then((result) => {
            setIsProd(result.data)
            setFilterData(result.data)
         })
         .catch((error) => {
          toast.error(error)
         })
  }, [])

    return (
      <div className={`container-fluid`}>
      <h2>Stock Inventory</h2>
    
      <div className='row'>
      <div className='col-divide'>
         <p>Search : </p>
        <input type='search' className='search' placeholder='Search By Name...' onChange={handlefilter}/>
      </div>
      </div>
        <div className='row'>
        <div className='col'>
              <table className='table' id='tablexl'>
                <tr>
                  <th>BARCODE</th>
                  <th>PRODUCT</th>
                  <th>CATEGORIES</th>
                  <th>EXPIRY DATE</th>
                  <th>PRICE</th>
                  <th>IN STOCK</th>
                </tr>
                {!!isProd && isProd.map((prod) => {
                  return   (
                                <tr className='tr-row' id={prod._id}>
                                  <td>{prod.batchno}</td>
                                  <td>{prod.name}</td>
                                  <td>{prod.categories}</td>
                                  <td>{prod.expdate}</td>
                                  <td>Kes. {prod.sellingprice}</td>
                                  <td>{prod.quantity}</td>
                                </tr>
                            );
                })
                }
              </table>
        </div>
    </div>
</div>
    )
}

export default Products
