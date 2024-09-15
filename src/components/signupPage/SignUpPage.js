import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SignUpPage = ({children}) => {
    const location = useLocation();

    const [isSignUp, setIsSignUp] = useState(false)

    useEffect(()=>{
        //console.log(location)
        if(location.pathname === 'signup' || location.pathname === 'register'){
            setIsSignUp(true);
        }else{
            setIsSignUp(false);
        }
    },[location])

  return (
    <div>
      {isSignUp && children}
    </div>
        )

}

export default SignUpPage
