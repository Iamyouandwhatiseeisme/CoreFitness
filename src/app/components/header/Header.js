import "./Header.css"; 
import Link from 'next/link'


const Header = () => {
    return ( 
        <header className="header">
            <nav>
                <ul className="navigation-links">
                    <Link href="/profile"><li>Profile</li></Link>
                    <Link href="/settings"><li>Settings</li></Link>
                    <Link href="/cart"><li>Cart</li></Link>
                </ul>

            </nav>
            
        </header>
     );
}
 
export default Header;