import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const Products = () => {

  const [isProd, setIsProd] = useState(null)
  const [filterData, setFilterData] = useState(null) 
  const [modalImage, setModalImage] = useState(null)
  const [imageModal, setImageModal] = useState(false)

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

  const popImage = (e) => {
    setImageModal(true)
    setModalImage(e.target.src)
  }
 
  const handleProductModalClose = () => {
   setImageModal(false)
  }

    return (
      <div className={`container-fluid`}>
      
      <div className={`${imageModal ? "background" : ""}`}></div>

      <h2>Stock Inventory</h2>
    
      <div className='row'>

      <div className={`modal ${imageModal ? "open" : ""}`}>
        <div className='modal-content'>
          <div className='modal-dialog'>
            <div className='modal-header'>
              <h2>Product Image</h2>
              <i className='bi bi-x-lg' onClick={handleProductModalClose} style={{cursor : "pointer"}}></i>
            </div>
            <div className='modal-body'>
                 <img src={modalImage} alt='product_image' width="300px" height="300px" style={{borderRadius: "50%"}}/>
            </div>
          </div>
         </div>
      </div>

      <div className='col-divide'>
         <p>Search : </p>
        <input type='search' className='search' placeholder='Search By Name...' onChange={handlefilter}/>
      </div>
      </div>
        <div className='row'>
        <div className='col'>
              <table className='table' id='tablexl'>
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT</th>
                  <th>CATEGORIES</th>
                  <th>EXPIRY DATE</th>
                  <th>PRICE</th>
                  <th>IN STOCK</th>
                </tr>
                {!!isProd && isProd.map((prod) => {
                  return   (
                                <tr className='tr-row' id={prod._id}>
                                <td><img src={prod.prd_img} alt='product_image' width="50px" height="50px"  style={{cursor: "pointer", borderRadius: "50%"}} onClick={popImage}/></td>     
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
