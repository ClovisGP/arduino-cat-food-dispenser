import React from 'react'
import './DisplayCase.css'

function DisplayCase(props) {

  return (
    <div className='DisplayCase'>
        <div className='title'>{props.label}</div>
        {
            props.content ?
                <div className='content'>{props.content}</div> : 
                <button onClick={props.clickHandler}>{props.isAlt ? props.colorButtonAlt ? 'Activé' : 'Desactiver' : ''} </button>
        }
        
    </div>
  )
}

export default DisplayCase