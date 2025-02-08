import React, { useState } from "react";
import Logo from "../../../../public/images/Header Logo.webp";

import {
  PiBarbell,
  PiClipboardText,
  PiCreditCard,
  PiNewspaper,
  PiShoppingBagOpen,
  PiUserCircle,
} from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLocale } from "../providers/LanguageContext";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

interface TopPanelProps {
  currentUser: User | null;
}

export default function TopPanel({ currentUser }: TopPanelProps) {
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const listItemStyle: string = "";
  // "hover:border-[#5A5B5C] hover:border w-40 gap-2 transition-all duration-300 transform hover:scale-110 hover:shadow-xl dark:hover:bg-[#4E4F50] hover:rounded-3xl  font-normal dark:text-[#E4E6EB] p-5 text-start cursor-pointer flex flex-row items-center justify-start";
  if (!currentUser) return null;
  return (
    <div
      className={`${
        isOpen ? "h-32" : "h-14"
      } bg-white dark:bg-black sm:hidden flex flex-col items-start fixed top-0 left-0 w-full z-50 transition-height  duration-300 ease-in-out`}
    >
      <div
        className="justify-between items-center w-full flex flex-row  p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Link
          href={`/${locale}`}
          className="p-2 w-10 h-10 bg-transparent cursor-pointer items-center"
        >
          <img src={Logo.src} alt="logo"></img>
        </Link>
        {/* {isOpen ? "Close" : "Open"} */}
        <RxHamburgerMenu></RxHamburgerMenu>
      </div>
      <div className={`${isOpen ? "flex h-24 flex-row" : "hidden"}`}>
        <div className="flex gap-38 items-center flex-row pt-5 pb-5 ml-2">
          <nav className="rounded-3xl flex-row dark:border-header-hover-dark h-20 items-start justify-start p-2">
            <ul className="gap-5 flex list-none flex-row">
              <Link href={`/${locale}/equipment`}>
                <li className={listItemStyle}>
                  <PiBarbell></PiBarbell>
                </li>
              </Link>
              <Link href={`/${locale}/blogs`}>
                <li className={listItemStyle}>
                  <PiNewspaper></PiNewspaper>
                </li>
              </Link>
              <Link href={`/${locale}/orders`} data-cy="orders-button">
                <li className={listItemStyle}>
                  <PiClipboardText></PiClipboardText>
                </li>
              </Link>
              <Link href={`/${locale}/products`} data-cy="products-page-button">
                <li className={listItemStyle}>
                  <PiShoppingBagOpen></PiShoppingBagOpen>
                </li>
              </Link>
              <Link href={`/${locale}/profile`} data-cy="profile-button">
                <li className={`${listItemStyle} `}>
                  <PiUserCircle></PiUserCircle>
                </li>
              </Link>
              <Link href={`/${locale}/pricing`}>
                <li className={`${listItemStyle}`}>
                  <PiCreditCard></PiCreditCard>
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
