import React from "react";
import Link from "next/link";
import { useLocale } from "../providers/LanguageContext";
const Footer = () => {
  const {
    dictionary: { footer },
  } = useLocale();
  return (
    <footer className="flex justify-end pb-1 h-12  text-black  dark:text-white">
      <nav>
        <ul className="list-none mr-12 mt-2 flex gap-5">
          <Link href="/">
            <li>{footer.Home}</li>
          </Link>

          <Link href="/contact">
            <li>{footer.Contact}</li>
          </Link>

          <li>All rights reserved {new Date().getFullYear()}</li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
