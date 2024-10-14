"use client"
import React, { useState} from "react"
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import "./DropDown.css"
 

const DropDown = ({buttonText, content}) => {
    const [open, setOpen] = useState(false);
    const toggleDropDown = () =>{
        setOpen((open)=> !open);
    }

    const onSelectHandler = (option) => {
        toggleDropDown();
        
        
    }

   

    return (
        <div className="dropdown">
            <DropDownButton toggle={toggleDropDown} open={open}>
            {buttonText}

            </DropDownButton>
            <DropDownContent onSelect={onSelectHandler} open={open}>
            {content}
                
            </DropDownContent>
            

        </div>
    )
}

export default DropDown;