import React, { useState, useEffect, useRef } from "react"
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import "./DropDown.css"
 

const DropDown = ({buttonText, content}) => {
    const [open, setOpen] = useState(false);
    const toggleDropDown = () =>{
        setOpen((open)=> !open);
    }
    const dropDownRef = useRef();

    useEffect(()=>{
        const handler = (event) => {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setOpen(false);

            }
            document.addEventListener("click", handler)

            return () =>{
                document.removeEventListener("click", handler);
            }
        }

    }, [dropDownRef])

    return (
        <div className="dropdown" ref={dropDownRef}>
            <DropDownButton toggle={toggleDropDown} open={open}>
            {buttonText}

            </DropDownButton>
            <DropDownContent open={open}>
            {content}
                
            </DropDownContent>
            

        </div>
    )
}

export default DropDown;