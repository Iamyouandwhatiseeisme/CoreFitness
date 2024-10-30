import React from "react";
import "./DropDownContent.css";
import DropDownItem from "../DropDownItem/DropDownItem";

const DropDownContent = ({ children, open, onSelect, toggleHandler, type }) => {
  return (
    <div className={open ? "dropdown-cnt content-open" : "dropdown-cnt"}>
      {
        <>
          {children.map((sortOptions) => (
            <DropDownItem
              onClick={onSelect}
              key={sortOptions.value}
              toggleHandler={toggleHandler}
              type={type}
            >
              {sortOptions}
            </DropDownItem>
          ))}
        </>
      }
    </div>
  );
};

export default DropDownContent;
