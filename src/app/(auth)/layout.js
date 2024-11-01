// "use client";
// import { useEffect, useState } from "react";
// import "../../app/styles/global.css";
// import { redirect } from "next/navigation";
// import "../styles/global.css";
// import Footer from "../components/footer/Footer";
// import Header from "../components/header/Header";
// // export const metadata = {
// //   title: "Medical Mushroom Market app",
// //   description: "Web site created with Next.js.",
// // };

// export default function RootLayout({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   useEffect(() => {
//     const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
//     if (!localStorage.getItem("theme")) {
//       localStorage.setItem("theme", theme ? "dark" : "light");
//       localStorage.setItem("system", true);
//     }
//     document.documentElement.classList.toggle(
//       "dark",
//       localStorage.theme === "dark" ||
//         (!("theme" in localStorage) &&
//           window.matchMedia("(prefers-color-scheme: dark)").matches)
//     );
//   }, []);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");
//     const authenticated = !(accessToken === null || refreshToken === null);

//     if (!authenticated) {
//       redirect("/login");
//     } else {
//       setIsAuthenticated(authenticated);
//     }
//   }, [isAuthenticated]);

//   return (
//     <html lang="en">
//       <head>
//         <script></script>
//       </head>
//       <body className="bg-neutral-200 dark:bg-neutral-900">
//         <noscript>You need to enable JavaScript to run this app.</noscript>
//         <Header></Header>
//         <div id="root">{children}</div>
//         <Footer></Footer>
//       </body>
//     </html>
//   );
// }
