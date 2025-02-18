"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../../../public/images/Header Logo.webp";
import { PiShoppingCart } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLocale } from "../providers/LanguageContext";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import LocaleChange from "../LanguageChange/LanguageChange";
import MobileThemeChange from "../MobileThemeChange/MobileThemeChange";
import { useCart } from "../providers/CartProvider";
import AuthenticationButton from "../logoutButton/LoggoutButton";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { TopPanelNavigationItems } from "src/app/constants/navigationItems";

interface TopPanelProps {
  currentUser: User | null;
}

export default function TopPanel({ currentUser }: TopPanelProps) {
  const { locale } = useLocale();
  const [currentPath, setCurrentPath] = useState<string>("");
  const pathname = usePathname();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const listItemStyle: string =
    "rounded p-1 border border-black dark:border-gray-200";
  useEffect(() => {
    const newPath =
      pathname
        .replace(/^\/(en-US|ka)/, "")
        .split("/")
        .filter(Boolean)[0] || "/";
    setCurrentPath(newPath);
  }, [pathname]);
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
          className="p-2  w-10 h-10 bg-transparent cursor-pointer items-center"
        >
          <img src={Logo.src} alt="logo"></img>
        </Link>
        <MobileThemeChange></MobileThemeChange>

        <LocaleChange></LocaleChange>
        <Link href={`/${locale}/cart`}>
          <button className="flex items-center pr-0">
            <PiShoppingCart className="w-4 h-4" />
            <span>({cartItems.length})</span>
          </button>
        </Link>
        <RxHamburgerMenu
          onClick={() => setIsOpen(!isOpen)}
          className="p-0 mr-6"
        ></RxHamburgerMenu>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "h-20" : "h-0"
        }`}
      >
        <nav className="rounded-3xl flex-row dark:border-header-hover-dark h-20 items-start justify-start p-2">
          <ul
            className={`gap-4 flex list-none flex-row transition-opacity duration-500 ease-in-out ${
              isOpen ? "opacity-100 delay-300" : "opacity-0"
            }`}
          >
            {TopPanelNavigationItems.map((navigationItem) => {
              return (
                <Link
                  key={navigationItem.title}
                  href={`/${locale}/${navigationItem.title}`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <li
                    className={`${listItemStyle} ${
                      currentPath === navigationItem.title
                        ? "scale-150 dark:bg-gray-200/40 bg-gray-200"
                        : ""
                    }`}
                  >
                    <navigationItem.icon></navigationItem.icon>
                  </li>
                </Link>
              );
            })}
            <li>
              <AuthenticationButton
                locale={locale}
                href={`/${locale}/login`}
                type="logout"
                buttonText={"Logout"}
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export interface TopPanelNavigation {
  title: string;
  icon: IconType;
}
