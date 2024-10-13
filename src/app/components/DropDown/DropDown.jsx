import React, { useState} from "react"
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import "./DropDown.css"
 

const DropDown = ({buttonText, content, onSelect}) => {
    const [open, setOpen] = useState(false);
    const toggleDropDown = () =>{
        setOpen((open)=> !open);
    }

    const onSelectHandler = (option) => {
        console.log('Selected option:', option);
        toggleDropDown();
        onSelect(option);
        
    }

   

    return (
        <div className="dropdown">
            <DropDownButton toggle={toggleDropDown} open={open}>
            {buttonText}

            </DropDownButton>
            <DropDownContent onSelect={onSelectHandler}open={open}>
            {content}
                
            </DropDownContent>
            

        </div>
    )
}

export default DropDown;