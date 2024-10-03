import "./Header.css"; 
import {Link} from "react-router-dom";


const Header = () => {
    return ( 
        <header className="header">
            <nav>
                <ul className="navigation-links">
                    <Link to="/profile"><li>Profile</li></Link>
                    <li>Settings</li>
                    <li>Cart</li>
                </ul>

            </nav>
            
        </header>
     );
}
 
export default Header;