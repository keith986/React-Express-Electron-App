import React, {useEffect, useState} from 'react'
import '../App.css'
import { toast } from 'react-hot-toast';
import axios from 'axios'
import $ from 'jquery'

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
      expdate : '',
      date: '',
      month : '',
      year : ''
    })
    const [isProd, setIsProd] = useState([])
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [storeid, setStoreId] = useState(null)
    const [filterDatas, setFilterDatas] = useState([]) 
    const [storedata, setStoreData] = useState([])
    const [supplier, setSupplier] = useState([])
    const [category, setCategory] = useState([])
    const [previewer, setPreviewer] = useState([])

    useEffect(() => {
      axios.get('/getproducts')
           .then((result) => {
              setIsProd(result.data)
              setFilterDatas(result.data)
            })
           .catch((error) => {
            toast.error(error)
            })
    }, [isProd])

    const handleChange = async (e) => {
      setProducts({...products, [e.target.name] : [e.target.value]})
    }

    const handleOpener = async () =>{
      setIsOpenModal(true)
    }

    const handleEditOpener = async (event) => {
      setIsEditOpen(true)
      setStoreId(event.target.id);

      axios.post('/previewproduct', {previewId: event.target.id})
           .then((result) => {
               setPreviewer(result.data)
            })
           .catch((error) => {
              toast.error(error)
            })

    }
  
    const handleDelete = async (event) => {
    
      axios.post('/deleteproduct', {deleting : event.target.id})
           .then((result) => {

             if(result.data.error){
              $('#prod-'+event.target.id).hide();
               toast.error(result.data.error);
             }

             if(result.data.success){
              toast.success(result.data.success)      
             }

             })
           .catch(err => toast.error(err.message))
    }
  
    function handleClose(){
      setIsOpenModal(false)
    }

    function handleEditClose () {
       setIsEditOpen(false)
    }

    const handlefilter = async (event) => {
      const respo = filterDatas.filter(s => s.name.includes(event.target.value))
      setIsProd(respo)
    }

   useEffect(() => {
    axios.get('/storeData')
         .then((result) => {
           setStoreData(result.data)
         })
         .catch(err => toast.error(err))
   }, [])

   useEffect(()=> {
    axios.get('/getsuppliers')
         .then((result) => {
           setSupplier(result.data)
         })
         .catch((error) => {
          toast.error(error)
         })
   }, [])

   useEffect( () => {
    axios.get('/getcategories')
         .then((result) => {
          setCategory(result.data)
         })
         .catch((error) => {
          toast.error(error)
         })
   }, [])

 //pagination
const [currentPage, setCurrentPage] = useState(1)
const rowPerPage = 5
const lastIndex = rowPerPage * currentPage
const firstIndex = lastIndex - rowPerPage
const records = !!isProd && isProd.slice(firstIndex, lastIndex) 
const nPage = Math.ceil(isProd.length / rowPerPage)
const numbers = [...Array(nPage + 1).keys()].slice(1)

const handlePrev = async () => {
  if(currentPage !== 1){
    return setCurrentPage(currentPage - 1)
  }else{
    return setCurrentPage(1)
  }
}

const handleNext = async () => {
  if(currentPage !== nPage){
     setCurrentPage(currentPage + 1)
  }else{
     setCurrentPage(nPage)
  }
}

function handlePage (id) {
   setCurrentPage(id)
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

    return (
      <div className={`container-fluid`}>
         <div className={`${isModalOpen ? "background" : ""}`}></div>  
         <div className={`${isEditOpen ? "background" : ""}`}></div>

      <h2>Stock Inventory</h2>
      <div className='row'>
        <button type='button' className='modalopener' onClick={handleOpener}>New Stock</button>
       
        <div className={`modal ${isModalOpen ? "open" : ""}`}>
          <div className='modal-dialog'>
          <form onSubmit={submitChange} encType='multipart/formdata'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h2>Add Product</h2>
                <i className='bi bi-bag-fill'></i>
              </div>
              <div className='modal-body'>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Product Name :</span>
              <input type='text' className='name-input' name='name' onChange={handleChange} placeholder='Product name'/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Product description : </span>
              <input type='text' className='manager-input' placeholder='e.g Men shoes' name='description' onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Cost Price</span>
              <input type='number' className='location-input' placeholder='1000' name='costprice' onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Selling Price</span>
              <input type='tel' className='phone-input' placeholder='1500' name='sellingprice' onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Quantity</span>
              <input type='number' className='phone-input' name='quantity' onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
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
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
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
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Warehouse</span>
              <select className='status-input' name='warehouse' onChange={handleChange}>
              <option>Choose...</option>
              {!!storedata && storedata.map((strl) => {

                var str_nm = strl.storename;

                if(strl.status === 'Closed'){
                  return !str_nm
                }
                return (
                    <option value={`${str_nm}`}>{str_nm}</option>
                       )
                })
              }
              </select>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>MANUFACTURED DATE</span>
              <input type='date' className='date-input' name='mandate' onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>EXPIRY DATE</span>
              <div className="digits">
                 <input type="number" maxLength="2" name="date" id="edit-input" onChange={handleChange} placeholder='date'/>
                 <input type="number" maxLength="2" name="month" id="edit-input" onChange={handleChange} placeholder='month'/>
                 <input type="number" maxLength="4" name="year" id="edit-input" onChange={handleChange} placeholder='year'/>
              </div>
              </div>

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
                <h2>Edit Product</h2>
                <i className='bi bi-bag-fill'></i>
              </div>
              <div className='modal-body'>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%" , marginTop : "5px"}}>
              <span className='name'>Product Name</span>
              <input type='text' className='name-input' name='name' placeholder={!!previewer && previewer.name} onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Product description</span>
              <input type='text' className='manager-input' placeholder={!!previewer && previewer.description} name='description' onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Cost Price</span>
              <input type='number' className='location-input' placeholder={!!previewer && previewer.costprice} name='costprice' onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Selling Price</span>
              <input type='tel' className='phone-input' placeholder={!!previewer && previewer.sellingprice} name='sellingprice' onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Quantity</span>
              <input type='number' className='phone-input' name='quantity' placeholder={!!previewer && previewer.quantity} onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
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
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
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
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>Warehouse</span>
              <select className='status-input' name='warehouse' onChange={handleChange}>
              <option>Choose...</option>
              {!!storedata && storedata.map((str) => {
                const st_name = str.storename;
                if(str.status === 'Closed')
                {
                  return !st_name;
                }
                return (
                    <option value={`${st_name}`}>{st_name}</option>
                       )
                })
              }
              </select>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>MANUFACTURED DATE</span>
              <input type='date' className='date-input' name='mandate' onChange={handleChange}/>
              </div>

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%", marginTop : "5px"}}>
              <span className='name'>EXPIRY DATE</span>
              <div className="digits">
                 <input type="number" maxLength="2" name="date" id="edit-input" onChange={handleChange} placeholder={!!previewer && previewer.edate}/>
                 <input type="number" maxLength="2" name="month" id="edit-input" onChange={handleChange} placeholder={!!previewer && previewer.emonth}/>
                 <input type="number" maxLength="4" name="year" id="edit-input" onChange={handleChange} placeholder={!!previewer && previewer.eyear}/>
              </div>
              </div>

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
        <p>Search: </p>
        <input type='search' className='search' placeholder='Search By Name...' onChange={handlefilter}/>
      </div>
      </div>
      <div className='row'>
        <div className='col'>
              <table className='table' id='tablexl'>
                <tr>
                  <th>PRODUCT</th>
                  <th>CATEGORIES</th>
                  <th>EXPIRY DATE</th>
                  <th>PRICE</th>
                  <th>IN STOCK</th>
                  <th>STORE</th>
                  <th>ACTIONS</th>
                </tr>
                {!!records && records.map((prod) => {
                  var ed = prod.edate;
                  var em = prod.emonth;
                  var ey = prod.eyear;

                  var num = prod.sellingprice;
                  var nu_mb = num.toLocaleString();

                  return   (
                                <tr className='tr-row' id={'prod-'+prod._id}>
                                  <td>{prod.name}</td>
                                  <td>{prod.categories}</td>
                                  <td>{ey + '-' + em + '-' + ed}</td>
                                  <td>Kes. {nu_mb}</td>
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

export default Products
