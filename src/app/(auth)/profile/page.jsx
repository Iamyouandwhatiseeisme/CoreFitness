"use client";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { LoadingGear } from "../../components/profile/loading-gear";
import { UserProfile } from "../../components/profile/user-profile";
import "./index.css";
import { useState, useEffect } from "react";
import { useTokens } from "../../hooks/useTokens";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { accessToken, refreshtoken } = useTokens();

  useEffect(() => {
    const token = accessToken;
    async function fetchUser() {
      try {
        const response = await fetch("https://dummyjson.com/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
    }
    fetchUser();
  }, [accessToken, refreshtoken]);

  return (
    <div className="page-wrapper">
      <Header />
      <div className="default-layout">
        {user ? (
          <>
            <UserProfile user={user} />
            <Footer />
          </>
        ) : (
          <LoadingGear />
        )}
      </div>
    </div>
  );
}
