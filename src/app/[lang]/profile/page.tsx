"use client";
import { useUser } from "../../components/providers/UserProvider";
// import Header from "../../components/header/Header";
// import Footer from "../../components/footer/Footer";
// import { LoadingGear } from "../../components/profile/loading-gear";

// import { UserProfile } from "../../components/profile/user-profile";
import "./index.css";
// import { useState, useEffect } from "react";
// import { useTokens } from "../../hooks/useTokens";

export default function Profile() {
  const { user } = useUser();

  return (
    <div className="page-wrapper">
      <div className="default-layout">
        {user ? (
          <>
            <div>{user.email}</div>
          </>
        ) : (
          <div>"loading"</div>
        )}
      </div>
    </div>
  );
}
