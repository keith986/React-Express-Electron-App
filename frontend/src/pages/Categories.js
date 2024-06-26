import React, {useState, useEffect} from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const Categories = () => {
    const [isModalOpen, setIsOpenModal] = useState(false)
    const [categorys, setCategory] = useState({categoryname : ''})
    const [categoryData, setCategoryData] = useState(null)
    const [deleting, setDeleting] = useState(null)

    const handleOpener = () =>{
      setIsOpenModal(true)
    }
  
    function handleClose(){
      setIsOpenModal(false)
    }

    const handleChange = (e) => {
      setCategory({...categorys, [e.target.name] : [e.target.value]})
    }

    const handleDelete = (event) => {
       setDeleting(event.target.id)
       const parent = document.getElementById(event.target.id)
       parent.style.display = 'none'
    }

    const submitChange = (event) => {
      event.preventDefault();

      axios.post('/addcategory', {categorys})
           .then((result) => {
               
            console.log(result)
               if(result.data.success){
                  toast.success(result.data.success)
               }

               if(result.data.error){
                 toast.error(result.data.error)
               }

           })
           .catch(err => toast.error(err))

    }

  useEffect(() => {
     axios.get('/getcategories')
          .then((result) => {
             setCategoryData(result.data)
          })
          .catch((error) => {
            toast.error(error)
          })
  }, [categoryData])  

  useEffect(()=> {

    axios.post('/deletecategory', {deleting})
         .then((result) => {
            if(result.data.success){
              toast.success(result.data.success)
            }
            if(result.data.error){
              toast.error(result.data.error)
            }
         })
         .catch((error) => {
            toast.error(error)
         })

  }, [deleting])

    return (
      <div className={`container-fluid`}>
      <div className={`${isModalOpen ? "background" : ""}`}></div>
      <h2>Products Categories</h2>
     <div className='row'>
        <button type='button' className='modalopener' onClick={handleOpener}>New Category</button>
        <div className={`modal ${isModalOpen ? "open" : ""}`}>
          <div className='modal-dialog'>
            <div className='modal-content'>
            <form onSubmit={submitChange}>
              <div className='modal-header'>
                <h2>Create Categories</h2>
                <i className='bi bi-diagram-3-fill'></i>
              </div>
              <div className='modal-body'>
              <span className='name'>Category's Name</span>
              <input type='text' className='name-input' name='categoryname' onChange={handleChange} required/>
              </div>
              <div className='modal-footer'>
              <span>.</span>
              <button type='button' className='back' onClick={handleClose}>Back</button>
              <button type='submit' className='send'>Create</button>
              </div>
            </form>
            </div>
          </div>
        </div>
     </div>
      <div className='row'>
      <div className='col-divide'>
         <p>Search : </p>
        <input type='search' className='search' placeholder='Search By Name...'/>
      </div>
      </div>
        <div className='row'>
        <div className='col'>
              <table className='table'>
                <tr>
                  <th>Category Name</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
                {!!categoryData && categoryData.map((cat) => {
                    return (
                             <tr className='tr-row' id={cat._id}>
                              <td>{cat.categoryname}</td>
                              <td>{cat.createdAt}</td>
                              <td>
                               <i className='bi bi-trash-fill tr-icon' id={cat._id} onClick={handleDelete}></i>
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

export default Categories
