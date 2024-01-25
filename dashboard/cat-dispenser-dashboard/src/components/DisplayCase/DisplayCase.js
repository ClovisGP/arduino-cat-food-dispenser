import React from 'react'
import './DisplayCase.css'

function DisplayCase(props) {
  return (
    <div className='DisplayCase'>
        <div className='title'>{props.label}</div>
        {
            props.content ?
                <div className='content'>{props.content}</div> : 
                <button onClick={props.clickHandler()}></button>
        }
        
    </div>
  )
}

export default DisplayCase