import React from 'react'

const Activation = () => {
  return (
    <div className='container'>
      <h1>ACTIVATE YOUR PRODUCT</h1>
      <div className='row' id='nms'>
        <h4 className='name'>Company Name:</h4>
      </div>
      <div className='row'>
        <input type='text' className='names-input' value={'Jango Enrerprise'} readOnly style={{borderTop : "none", borderLeft: "none", borderRight: "none" , outline: "none", background: "transparent"}}/>
      </div>
      <div className='row'>
        <h4 className='name'>Activation Code</h4>
      </div>
      <div className='row'>
        <input type='text' className='names-input' placeholder='Activation code required...'/> 
      </div>
      <span className='name'></span>
      <div className='row'>
      <button type='button' className='generate'>ACTIVATE NOW</button>
      </div>
    </div>
  )
}

export default Activation
