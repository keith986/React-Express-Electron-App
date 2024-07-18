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
    const [isProd, setIsProd] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [storeid, setStoreId] = useState(null)
    const [filterDatas, setFilterDatas] = useState(null) 
    const [storedata, setStoreData] = useState(null)
    const [supplier, setSupplier] = useState(null)
    const [category, setCategory] = useState(false)
    const [previewer, setPreviewer] = useState(null)
    const [srcUrl, setSrcUrl] = useState(null)
    const [modalImage, setModalImage] = useState(null)
    const [imageModal, setImageModal] = useState(false)

    const handleChange = (e) => {
      setProducts({...products, [e.target.name] : [e.target.value]})
    }

    const handleOpener = () =>{
      setIsOpenModal(true)
    }

    const handleEditOpener = (event) => {
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
  
    const handleDelete = (event) => {
    
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

    const handlefilter = (event) => {
      const respo = filterDatas.filter(s => s.name.includes(event.target.value))
      setIsProd(respo)
    }

    function submitChange (e) {

      e.preventDefault();
      axios.post('/addproduct', {products, srcUrl})
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
              setFilterDatas(result.data)
           })
           .catch((error) => {
            toast.error(error)
           })
    }, [isProd])
  

    const submitEditChange = async (e) => {
      e.preventDefault();
 
      await axios.post('/editproduct', {products, storeid, srcUrl})
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

 const handleImage = () => {
   $('#image').trigger('click');
 }

 const handleImageChange = (e) => {
  const file = e.target.files[0];
  let fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = function (){
     setTimeout(()=>{
      setSrcUrl(fileReader.result)
     },500)
  }
 }

 const popImage = (e) => {
   setImageModal(true)
   setModalImage(e.target.src)
 }

 const handleProductModalClose = () => {
  setImageModal(false)
 }

    return (
      <div className={`container-fluid`}>
         <div className={`${isModalOpen ? "background" : ""}`}></div>  
         <div className={`${isEditOpen ? "background" : ""}`}></div>
         <div className={`${imageModal ? "background" : ""}`}></div>

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
             
              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%"}}>
              <span className='name'>Upload Product's Image : <i className='bi bi-image-fill' style={{fontSize: "30px"}} onClick={handleImage}></i></span>
              <input type='file' accept="images/*" className='name-input' name='image' id='image' onChange={handleImageChange} style={{display: 'none'}}/>
              <img src={srcUrl} alt='product_image' id="dis-play"/>
              </div>

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

              <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", width: "100%"}}>
              <span className='name'>Change Product's Image : <i className='bi bi-image-fill' style={{fontSize: "30px"}} onClick={handleImage}></i></span>
              <input type='file' accept="images/*" className='name-input' name='image' id='image' onChange={handleImageChange} style={{display: 'none'}}/>
              <img src={srcUrl} alt='product_image' id="dis-play"/>
              </div>

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
                if(st_name === 'Closed')
                {
                  return st_name;
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
                  <th>IMAGE</th>
                  <th>PRODUCT</th>
                  <th>CATEGORIES</th>
                  <th>EXPIRY DATE</th>
                  <th>PRICE</th>
                  <th>IN STOCK</th>
                  <th>STORE</th>
                  <th>ACTIONS</th>
                </tr>
                {!!isProd && isProd.map((prod) => {
                  var ed = prod.edate;
                  var em = prod.emonth;
                  var ey = prod.eyear;

                  return   (
                                <tr className='tr-row' id={'prod-'+prod._id}>
                                  <td><img src={prod.prd_img} alt='product_image' width="50px" height="50px"  style={{cursor: "pointer", borderRadius: "50%"}} onClick={popImage}/></td>
                                  <td>{prod.name}</td>
                                  <td>{prod.categories}</td>
                                  <td>{ey + '-' + em + '-' + ed}</td>
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
