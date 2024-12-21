"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

import "./index.css";
import { User } from "@supabase/supabase-js";

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
