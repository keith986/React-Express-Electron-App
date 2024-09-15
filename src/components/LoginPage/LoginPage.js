import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const LoginPage = ({children}) => {
    const location = useLocation()

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if(location.pathname === '/login' || location.pathname === '/' || location.pathname === ''){
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
