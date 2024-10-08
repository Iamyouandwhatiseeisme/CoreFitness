import "./Footer.css";
import React from "react";
import Link from "next/link"
const Footer = () => {
    return ( 
        <footer className="footer">
            <nav>
                <ul className="footer-list">
                    <Link href="/"><li>Home</li></Link>
                    <Link href="/about"><li>About</li></Link>
                    <Link href="/contact"><li>Contact</li></Link>
                    
                    <li>All rights reserved {new Date().getFullYear()}</li>
                </ul>
            </nav>   
        </footer>
     );
}
 
export default Footer;