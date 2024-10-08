import "./Footer.css";
import React from "react";
import Link from "next/link"
const Footer = () => {
    return ( 
        <footer className="footer">
            <nav>
                <ul className="footer-list">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <Link href="/blog"><li>Blog</li></Link>
                    <li>All rights reserved {new Date().getFullYear()}</li>
                </ul>
            </nav>   
        </footer>
     );
}
 
export default Footer;