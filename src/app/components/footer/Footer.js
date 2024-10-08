import "./Footer.css";
import React from "react";

const Footer = () => {
    return ( 
        <footer className="footer">
            <nav>
                <ul className="footer-list">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Blog</li>
                    <li>All rights reserved {new Date().getFullYear()}</li>
                </ul>
            </nav>   
        </footer>
     );
}
 
export default Footer;