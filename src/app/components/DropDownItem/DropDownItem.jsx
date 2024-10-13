import React from 'react'
import "./DropDownItem.css"

const DropDownItem = ({children, onClick}) => {
  return (
    <div className='dropdown-item' onClick={()=>{
        onClick(children)
    }}>{children.label}</div>
  )
}

export default DropDownItem