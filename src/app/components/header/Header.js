import "./Header.css";
import Link from "next/link";
import LoggoutButton from "../logoutButton/LoggoutButton";
import Logo from "../../../../public/images/Header Logo.webp";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import DropDown from "../DropDown/DropDown";

const Header = () => {
  const theme = [
    {
      label: "light",
    },
    {
      label: "dark",
    },
    {
      label: "system",
    },
  ];
  return (
    <header className="header flex-row justify-between">
      <div className="flex gap-38">
        <img
          src={Logo.src}
          alt="logo"
          style={{
            paddingTop: "15px",
            fill: "white",
            width: "50px",
            height: "50px",
            backgroundColor: "transparent",
          }}
        ></img>
        <nav>
          <ul className="navigation-links gap-5">
            <li className="text-yellow-500">Equipment</li>
            <li className="text-yellow-500">Trainers</li>
            <li className="text-yellow-500">Certificates</li>
            <li className="text-yellow-500">Schedules</li>
            <li className="text-yellow-500">Locations </li>
            <Link href="/profile">
              <li className="text-yellow-500">Profile</li>
            </Link>
            <Link href="/settings">
              <li className="text-yellow-500">Settings</li>
            </Link>
            <Link href="/cart">
              <li className="text-yellow-500">Cart</li>
            </Link>
            <Link href="/blog">
              <li className="text-yellow-500">Blog</li>
            </Link>
            <Link href="/products">
              <li className="text-yellow-500">Products</li>
            </Link>
            <Link href="/posts">
              <li className="text-yellow-500">Posts</li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="pr-20 flex flex-row items-center gap-10">
        <DropDown
          content={theme}
          buttonText="System"
          toggleHandler={() => {}}
          type="Theme"
        ></DropDown>
        <LoggoutButton />
      </div>

      {/* <i
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
      ></i> */}
    </header>
  );
};

export default Header;
