import React from 'react'
import "./DropDownButton.css"

const DropDownButton = ({children, open, toggle}) => {
  return (
    <div className={open? "button-open dropdown-btn" : "dropdown-btn"} onClick={toggle}>{children}</div>
  )
}

export default DropDownButton