import React, {useEffect, useState} from 'react'
import '../App.css'
import { toast } from 'react-hot-toast';
import axios from 'axios'

const Products = () => {
    const [isModalOpen, setIsOpenModal] = useState(false)
    const [products, setProducts] = useState({
      batchno : '',
      name: '',
      description: '',
      costprice: '',
      sellingprice : '',
      quantity: '',
      categories : '',
      warehouse: '',
      supplier: '',
      mandate: '',
      expdate : ''
    })
    const [isProd, setIsProd] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [storeid, setStoreId] = useState(null)
    const [deleting, setDeleting] = useState(null)
    const [filterData, setFilterData] = useState(null) 
    const [storedata, setStoreData] = useState(null)
    const [supplier, setSupplier] = useState(null)
    const [category, setCategory] = useState(false)

    const handleChange = (e) => {
      setProducts({...products, [e.target.name] : [e.target.value]})
    }

    const handleOpener = () =>{
      setIsOpenModal(true)
    }

    const handleEditOpener = (event) => {
      setIsEditOpen(true)
      setStoreId(event.target.id)
    }
  
    const handleDelete = (event) => {
      setDeleting(event.target.id)
    }
  
    function handleClose(){
      setIsOpenModal(false)
    }

    function handleEditClose () {
       setIsEditOpen(false)
    }

    const handlefilter = (event) => {
      const resp = filterData.filter(f => f.name.includes(event.target.value))
      setIsProd(resp)
   }

    function submitChange (e) {
      e.preventDefault();
      axios.post('/addproduct', {products})
           .then((result) => {
             if(result.data.error){
                toast.error(result.data.error)
             }
             if(result.data.success){
                toast.success(result.data.success)
             }
           })
           .catch((error) => toast.error(error))
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
    }, [isProd])
  
    useEffect(() => {
      axios.post('/deleteproduct', {deleting})
           .then((result) => {

             if(result.data.error){
               toast.error(result.data.error)
             }

             if(result.data.success){
              toast.success(result.data.success)
           
             }

             })
           .catch(err => toast.error(err.message))
    }, [deleting])

    const submitEditChange = async (e) => {
      e.preventDefault();
 
      await axios.post('/editproduct', {products, storeid})
                 .then((result) => {
 
                   if(result.data.error){
                     toast.error(result.data.error)
                   }
 
                   if(result.data.success){
                     toast.success(result.data.success)
                    }
 
     })
     .catch(err => toast.error(err.message))
   }

   useEffect(() => {
    axios.get('/storeData')
         .then((result) => {
           setStoreData(result.data)
         })
         .catch(err => toast.error(err))
   }, [storedata])

   useEffect(()=> {
    axios.get('/getsuppliers')
         .then((result) => {
           setSupplier(result.data)
         })
         .catch((error) => {
          toast.error(error)
         })
   }, [supplier])

   useEffect( () => {
    axios.get('/getcategories')
         .then((result) => {
          setCategory(result.data)
         })
         .catch((error) => {
          toast.error(error)
         })
   }, [category])

    return (
      <div className={`container-fluid`}>
         <div className={`${isModalOpen ? "background" : ""}`}></div>  
         <div className={`${isEditOpen ? "background" : ""}`}></div>
      <h2>Stock Inventory</h2>
     <div className='row'>
        <button type='button' className='modalopener' onClick={handleOpener}>New Stock</button>
       
        <div className={`modal ${isModalOpen ? "open" : ""}`}>
          <div className='modal-dialog'>
          <form onSubmit={submitChange}>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>Add Product</h2>
                <i className='bi bi-bag-fill'></i>
              </div>
              <div className='modal-body'>
              <span className='name'>Batch No.</span>
              <input type='text' className='name-input' name='batchno' placeholder='enter the barcode of the product for scanning' onChange={handleChange}/>
              <span className='name'>Product Name</span>
              <input type='text' className='name-input' name='name' onChange={handleChange}/>
              <span className='name'>Product description</span>
              <input type='text' className='manager-input' placeholder='e.g Men shoes' name='description' onChange={handleChange}/>
              <span className='name'>Cost Price</span>
              <input type='number' className='location-input' placeholder='1000' name='costprice' onChange={handleChange}/>
              <span className='name'>Selling Price</span>
              <input type='tel' className='phone-input' placeholder='1500' name='sellingprice' onChange={handleChange}/>
              <span className='name'>Quantity</span>
              <input type='number' className='phone-input' name='quantity' onChange={handleChange}/>
              <span className='name'>Categories</span>
              <select className='status-input' name='categories' onChange={handleChange}>
                <option>Choose...</option>
                {!!category && category.map((strg) => {
                return (
                    <option value={`${strg.categoryname}`}>{strg.categoryname}</option>
                       )
                })
              }
              </select>
              <span className='name'>Supplier</span>
              <select className='status-input' name='supplier' onChange={handleChange}>
              <option>Choose...</option>
              {!!supplier && supplier.map((stre) => {
                return (
                    <option value={`${stre.name}`}>{stre.name}</option>
                       )
                })
              }
              </select>
              <span className='name'>Warehouse</span>
              <select className='status-input' name='warehouse' onChange={handleChange}>
              <option>Choose...</option>
              {!!storedata && storedata.map((strl) => {
                return (
                    <option value={`${strl.storename}`}>{strl.storename}</option>
                       )
                })
              }
              </select>
              <span className='name'>MANUFACTURED DATE</span>
              <input type='date' className='date-input' name='mandate' onChange={handleChange}/>
              <span className='name'>EXPIRY DATE</span>
              <input type='date' className='date-input' name='expdate' onChange={handleChange}/>
              </div>
              <div className='modal-footer'>
              <span>.</span>
              <button type='button' className='back' onClick={handleClose}>Back</button>
              <button type='submit' className='send'>Add Product</button>
              </div>
  
            </div>
            </form>
          </div>
        </div>

        <div className={`modal ${isEditOpen ? "edit" : ""}`}>
          <div className='modal-dialog'>
          <form onSubmit={submitEditChange}>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>Add Product</h2>
                <i className='bi bi-bag-fill'></i>
              </div>
              <div className='modal-body'>
              <span className='name'>Batch No.</span>
              <input type='text' className='name-input' name='batchno' placeholder='enter the barcode of the product for scanning' onChange={handleChange}/>
              <span className='name'>Product Name</span>
              <input type='text' className='name-input' name='name' onChange={handleChange}/>
              <span className='name'>Product description</span>
              <input type='text' className='manager-input' placeholder='e.g Men shoes' name='description' onChange={handleChange}/>
              <span className='name'>Cost Price</span>
              <input type='number' className='location-input' placeholder='1000' name='costprice' onChange={handleChange}/>
              <span className='name'>Selling Price</span>
              <input type='tel' className='phone-input' placeholder='1500' name='sellingprice' onChange={handleChange}/>
              <span className='name'>Quantity</span>
              <input type='number' className='phone-input' name='quantity' onChange={handleChange}/>
              <span className='name'>Categories</span>
              <select className='status-input' name='categories' onChange={handleChange}>
                <option>Choose...</option>
                {!!category && category.map((stro) => {
                return (
                    <option value={`${stro.categoryname}`}>{stro.categoryname}</option>
                       )
                })
              }
              </select>
              <span className='name'>Supplier</span>
              <select className='status-input' name='supplier' onChange={handleChange}>
              <option>Choose...</option>
              {!!supplier && supplier.map((stri) => {
                return (
                    <option value={`${stri.name}`}>{stri.name}</option>
                       )
                })
              }
              </select>
              <span className='name'>Warehouse</span>
              <select className='status-input' name='warehouse' onChange={handleChange}>
              <option>Choose...</option>
              {!!storedata && storedata.map((str) => {
                return (
                    <option value={`${str.storename}`}>{str.storename}</option>
                       )
                })
              }
              </select>
              <span className='name'>MANUFACTURED DATE</span>
              <input type='date' className='date-input' name='mandate' onChange={handleChange}/>
              <span className='name'>EXPIRY DATE</span>
              <input type='date' className='date-input' name='expdate' onChange={handleChange}/>
              </div>
              <div className='modal-footer'>
              <span>.</span>
              <button type='button' className='back' onClick={handleEditClose}>Back</button>
              <button type='submit' className='send'>Updated Product</button>
              </div>
  
            </div>
            </form>
          </div>
        </div>

     </div>
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
                  <th>STORE</th>
                  <th>ACTIONS</th>
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
                                  <td>{prod.warehouse}</td>
                                  <td>
                                    <i className='bi bi-pencil-fill tr-icon' id={prod._id} onClick={handleEditOpener}></i>
                                    <i className='bi bi-trash-fill tr-icon' id={prod._id} onClick={handleDelete}></i>         
                                  </td>
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
