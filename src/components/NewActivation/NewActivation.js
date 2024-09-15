import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const NewActivation = ({children}) => {
    const [isActivated, setIsActivated] = useState(false)
    const location = useLocation()

    useEffect(()=>{
        if(location.pathname === '/activation'){
            setIsActivated(true)
        }else{
            setIsActivated(false)
        }
    },[location])

  return (
    <div>
      {isActivated && children}
    </div>
  )
}

export default NewActivation
