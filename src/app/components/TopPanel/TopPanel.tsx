import React, { useState } from "react";
import Logo from "../../../../public/images/Header Logo.webp";

import {
  PiBarbell,
  PiClipboardText,
  PiCreditCard,
  PiNewspaper,
  PiShoppingBagOpen,
  PiShoppingCart,
  PiUserCircle,
} from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLocale } from "../providers/LanguageContext";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import LocaleChange from "../LanguageChange/LanguageChange";
import MobileThemeChange from "../MobileThemeChange/MobileThemeChange";
import { useCart } from "../providers/CartProvider";

interface TopPanelProps {
  currentUser: User | null;
}

export default function TopPanel({ currentUser }: TopPanelProps) {
  const { locale } = useLocale();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const listItemStyle: string =
    "rounded p-1 border border-black dark:border-gray-200";
  if (!currentUser) return null;
  return (
    <div
      className={`${
        isOpen ? "h-32" : "h-14"
      } bg-white dark:bg-black sm:hidden flex flex-col items-start fixed top-0 left-0 w-full z-50 transition-height  duration-300 ease-in-out`}
    >
      <div className="justify-between items-center w-full flex flex-row  p-2">
        <Link
          href={`/${locale}`}
          className="p-2 w-10 h-10 bg-transparent cursor-pointer items-center"
        >
          <img src={Logo.src} alt="logo"></img>
        </Link>
        <LocaleChange></LocaleChange>
        <MobileThemeChange></MobileThemeChange>
        <RxHamburgerMenu onClick={() => setIsOpen(!isOpen)}></RxHamburgerMenu>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "h-20" : "h-0"
        }`}
      >
        <nav className="rounded-3xl flex-row dark:border-header-hover-dark h-20 items-start justify-start p-2">
          <ul
            className={`gap-5 flex list-none flex-row transition-opacity duration-500 ease-in-out ${
              isOpen ? "opacity-100 delay-300" : "opacity-0"
            }`}
          >
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
            <Link href={`/${locale}/cart`}>
              <button className="flex items-center">
                <PiShoppingCart className="w-4 h-4" />
                <span>({cartItems.length})</span>
              </button>
            </Link>
          </ul>
        </nav>
      </div>
      {/* </div> */}
    </div>
  );
}
