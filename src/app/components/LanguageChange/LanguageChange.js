"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";

export default function LanguageChange() {
  const pathname = usePathname();
  //   console.log(pathName);
  //   const [pathName, setPathname] = useState("");

  const lngs = ["en-US", "ka"];
  //   useEffect(() => {
  //     if (router.isReady) {
  //       const { asPath } = router;
  //       console.log(router.pathName);
  //     }
  //     console.log(pathName, "path");
  //   }, []);

  return (
    <div>
      {/* {lngs.map((lng) => {
        return (
          <button key={lng} onClick={() => redirect(`/${lng}${pathname}`)}>
            {lng}
          </button>
        );
      })} */}
    </div>
  );
}
