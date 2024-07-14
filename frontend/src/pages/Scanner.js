import React, { useState } from 'react'
import QRScanner from '../components/QRScanner/QRScanner'

function Scanner() {
    const [isOpen, setOpen] = useState(false);
    
    const openHello = (event) => {
      setOpen(!isOpen);
      console.log(isOpen);
      
    };
  
    //const closeModal = () => {
    //  setOpen(false);
  //  };
  
    const qrScanner = isOpen ? <QRScanner /> : null;


  return (
    <div className='container-fluid'>
         <button onClick={openHello} className='modalopener' style={{maxWidth: '300px'}}>Toggle Scanner</button>
        <div className='row'>{qrScanner}</div>
        <div className='cartscan' style={{color : '#fff'}}>
            
        </div>
    </div>
  )
}

export default Scanner
