"use client";
import { useRouter } from "next/navigation";
import { logout } from "../../util/logout";
import "./logout.css";
import React from "react";

export default function LoggoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      router.push("/login");
    } else {
      alert(result.message || "Logout failed.");
    }
  };
  return (
    <button className="logout-btn" onClick={handleLogout}>
      Log Out
    </button>
  );
}
