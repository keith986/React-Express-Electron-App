import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const RedirectNavbar = ({children}) => {

    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(()=>{
       // console.log(location); shows file path
        if(location.pathname === '/adminpage' || location.pathname === '/stores' || location.pathname === '/users' || location.pathname === '/suppliers' || location.pathname === '/categories' || location.pathname === '/products' || location.pathname === '/orders' || location.pathname === '/reports'|| location.pathname === '/creditors' || location.pathname === '/expires' || location.pathname === '/settings'){
            setShowNavbar(true)
        }else{
            setShowNavbar(false)
        }
    },[location])

  return (
    <>
      {showNavbar && children}
    </>
  )
}

export default RedirectNavbar
