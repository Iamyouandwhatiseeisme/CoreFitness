'use client';
import { useRouter } from "next/navigation";
import { logout } from "../../(unauth)/login/page";


import React from 'react'

export default function LoggoutButton() {
    const router = useRouter();
    
    const handleLogout = async () => {
        const result = await logout();

        if (result.success) {
            alert(result.message);
            router.push('/login');
        } else {
            alert(result.message || 'Logout failed.');
        }
    };
  return (
      <button onClick={handleLogout}>Log Out</button>
  )
}
