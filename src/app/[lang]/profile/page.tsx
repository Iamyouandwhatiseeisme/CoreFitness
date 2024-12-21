"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
// import Header from "../../components/header/Header";
// import Footer from "../../components/footer/Footer";
// import { LoadingGear } from "../../components/profile/loading-gear";

// import { UserProfile } from "../../components/profile/user-profile";
import "./index.css";
import { User } from "@supabase/supabase-js";
// import { useState, useEffect } from "react";
// import { useTokens } from "../../hooks/useTokens";

export default function Profile() {
  const [user, setUser] = useState<User | null>();
  const supabase = createClient();
  useEffect(() => {
    async function fetchUser() {
      var {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <div className="min-h-wrapper">
      <div className="pt-40">
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
