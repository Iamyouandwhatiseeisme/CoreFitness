"use client";
import "../../app/styles/global.css";
import { redirect } from "next/navigation";
// export const metadata = {
//   title: "Medical Mushroom Market app",
//   description: "Web site created with Next.js.",
// };

export default function RootLayout({ children, params }) {
  const accessToken = localStorage.getItem("accessToken") || null;
  const refreshToken = localStorage.getItem("refreshToken") || null;
  const isAuthenicated = !(accessToken === null || refreshToken === null);
  console.log(isAuthenicated, accessToken, refreshToken);
  if (!isAuthenicated) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />

        {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
