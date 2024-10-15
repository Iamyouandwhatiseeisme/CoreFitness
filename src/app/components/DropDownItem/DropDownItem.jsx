"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import "./DropDownItem.css"

const DropDownItem = ({children, onClick}) => {
  const router = useRouter();
  const handleSortOption = () =>{
    onClick();
    router.push(`?option=${children.option}&order=${children.order}`  )
  }

  return (
    <div className='dropdown-item' onClick={()=>{
        handleSortOption();
    }}>{children.label}</div>
  )
}

export default DropDownItem