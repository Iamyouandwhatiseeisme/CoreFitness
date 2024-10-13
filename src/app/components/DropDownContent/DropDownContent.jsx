import React from 'react'
import "./DropDownContent.css"

const DropDownContent = ({children, open}) => {
  return (
    <div className={ open ? 'dropdown-cnt content-open' : 'dropdown-cnt'}>{children}</div>
  )
}

export default DropDownContent