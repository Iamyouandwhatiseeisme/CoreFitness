import "./Footer.css";
import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
    return ( 
        <footer className="footer">
            <nav>
                <ul className="footer-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li>All rights reserved {new Date().getFullYear()}</li>
                </ul>
            </nav>   
        </footer>
     );
}
 
export default Footer;