import React from 'react'
import "./DropDownContent.css"
import DropDownItem from '../DropDownItem/DropDownItem'

const DropDownContent = ({children, open, onSelect}) => {
  return (
    <div className={ open ? 'dropdown-cnt content-open' : 'dropdown-cnt'}>{<>
        {children.map(sortOptions=><DropDownItem onClick={onSelect} key={sortOptions.value}>{sortOptions}</DropDownItem>)}
    </>}</div>
  )
}

export default DropDownContent