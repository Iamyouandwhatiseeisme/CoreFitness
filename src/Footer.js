import "./Footer.css";
import React from "react";
const Footer = () => {
    return ( 
        <div className="footer">
        <nav>
            <ul className="footer-list">
                <li>About</li>
                <li>Contact</li>
                <li>All rights reserved {new Date().getFullYear()}</li>
            </ul>
        </nav>   
        </div>
     );
}
 
export default Footer;