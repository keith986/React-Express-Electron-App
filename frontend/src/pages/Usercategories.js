import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const UserCategories = () => {

  const [categoryData, setCategoryData] = useState([])
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
 }, []) 
 
 //pagination
const [currentPage, setCurrentPage] = useState(1)
const rowPerPage = 10
const lastIndex = rowPerPage * currentPage
const firstIndex = lastIndex - rowPerPage
const records = categoryData.slice(firstIndex, lastIndex)
const nPage = Math.ceil(categoryData.length / rowPerPage)
const numbers = [...Array(nPage + 1).keys()].slice(1)

const handlePrev = () => {
  if(currentPage !== 1){
    return setCurrentPage(currentPage - 1)
  }else{
    return setCurrentPage(1)
  }
}

const handleNext = () => {
  if(currentPage !== nPage){
     setCurrentPage(currentPage + 1)
  }else{
     setCurrentPage(nPage)
  }
}

function handlePage (id) {
   setCurrentPage(id)
}

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
                
                  {!!records && records.map((cate) => {
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

export default UserCategories
