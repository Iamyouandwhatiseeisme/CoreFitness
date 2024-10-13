import React, { useState } from 'react'
import "./SortDropDownMenu.css"

const SortDropDown = ({sortOptions, onSort}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropDown = () => setIsOpen(!isOpen)

    const handlerSort = (sortByOption) => {
        setSelectedOption(sortByOption)
        onSort(sortByOption);
        setIsOpen(false);
    }


    return (
        <div className="sort-dropdown">
            <button onClick={toggleDropDown} className="sort-button">
                {selectedOption ? selectedOption.label: "Sort Products"}
            </button>
            {isOpen && (
                <ul className="sort-menu">
                    {sortOptions.map(option => {
                        return (
                            <li key={option.value} onClick={()=> handlerSort(option.value)}>
                                {option.label}
                            </li>
                        )
                    })}
                </ul>
            )}



        </div>
    )

}

export default SortDropDown