import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const LoginPage = ({children}) => {
    const location = useLocation()

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        //console.log(location)
        if(location.pathname === '/login' || location.pathname === '/'){
            setIsLogin(true)
        }else{
            setIsLogin(false)
        }
    },[location])

  return (
    <div>
      {isLogin && children}
    </div>
  )
}

export default LoginPage
