import "./Header.css"; 
import Link from 'next/link'


const Header = () => {
    return ( 
        <header className="header">
            <nav>
                <ul className="navigation-links">
                    <Link href="/profile"><li>Profile</li></Link>
                    <li>Settings</li>
                    <li>Cart</li>
                </ul>

            </nav>
            
        </header>
     );
}
 
export default Header;