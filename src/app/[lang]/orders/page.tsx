"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Orders() {
  const router = useRouter();
  const { session_id } = router.query;
  useEffect(() => {
    if (session_id) {
      console.log(session_id);
    }
  }, [session_id]);
  return <div className="w-full  min-h-wrapper pt-32 "></div>;
}
