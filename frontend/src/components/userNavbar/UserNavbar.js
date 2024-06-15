import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'

const UserNavbar = ({children}) => {
 
  const [isNavbar, setIsNavbar] = useState(false);

    const location = useLocation();

    useEffect(()=>{
       // console.log(location)
        if(location.pathname === '/userpage' || location.pathname === '/usercategories' || location.pathname === '/userproducts' || location.pathname === '/userorders'  || location.pathname === '/usercreditors' || location.pathname === '/userreports' || location.pathname === '/usersettings' ){
            setIsNavbar(true)
        }else{
            setIsNavbar(false)
        }
    },[location])

  return (
    <>
      {isNavbar && children}
    </>
  )
}

export default UserNavbar
