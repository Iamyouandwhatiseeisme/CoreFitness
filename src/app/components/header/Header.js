import "./Header.css";
import Link from "next/link";
import LoggoutButton from "../logoutButton/LoggoutButton";
import Logo from "../../../../public/images/Header Logo.webp";

const Header = () => {
  return (
    <header className="header">
      <img
        src={Logo.src}
        alt="logo"
        style={{
          paddingTop: "10px",
          fill: "white",
          width: "40px",
          height: "40px",
          backgroundColor: "transparent",
        }}
      ></img>
      <nav>
        <ul className="navigation-links">
          <li>Equipment</li>
          <li>Trainers</li>
          <li>Certificates</li>
          <li>Schedules</li>
          <li>Locations </li>
          <Link href="/profile">
            <li>Profile</li>
          </Link>
          <Link href="/settings">
            <li>Settings</li>
          </Link>
          <Link href="/cart">
            <li>Cart</li>
          </Link>
          <Link href="/blog">
            <li>Blog</li>
          </Link>
          <Link href="/products">
            <li>Products</li>
          </Link>
          <Link href="/posts">
            <li>Posts</li>
          </Link>
        </ul>
      </nav>
      <LoggoutButton />
      <i
        className="fa fa-google network-element"
        aria-hidden="true"
        style={{ fontSize: "32px", color: "white" }}
      ></i>
      <i
        className="fa fa-facebook network-element"
        aria-hidden="true"
        style={{ fontSize: "32px" }}
      ></i>
      <i
        className="fa fa-instagram network-element"
        aria-hidden="true"
        style={{ fontSize: "32px" }}
      ></i>
    </header>
  );
};

export default Header;
