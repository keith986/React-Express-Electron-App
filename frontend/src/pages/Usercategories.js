import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const UserCategories = () => {

  const [categoryData, setCategoryData] = useState(null)
  const [filterDatas, setFilterData] = useState(null)

  const handlefilter = (event) => {
    const resp = filterDatas.filter(s => s.categoryname.includes(event.target.value))
    setCategoryData(resp)
 }


  useEffect(() => {
    axios.get('/getcategories')
         .then((result) => {
            setCategoryData(result.data)
            setFilterData(result.data)
         })
         .catch((error) => {
           toast.error(error)
         })
 }, [categoryData]) 
   
    return (
      <div className={`container-fluid`}>
      <h2>Products Categories</h2>
   
      <div className='row'>
      <div className='col-divide'>
        <p>Search : </p>
        <input type='search' className='search' placeholder='Search By Name...' onChange={handlefilter}/>
      </div>
      </div>
        <div className='row'>
        <div className='col'>
              <table className='table' style={{background: "transparent", border: "none"}}>
                <tr>  
                  <th>Category Name</th>
                  <th>Created At</th>
                </tr>
                
                  {!!categoryData && categoryData.map((cate) => {
                    return (
                            <tr className='tr-row' id={cate._id}>
                            <td>{cate.categoryname}</td>
                            <td>{cate.createdAt}</td>
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

export default UserCategories
