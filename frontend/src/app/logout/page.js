"use client";
import query from "@/components/query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

async function logout() {
  const loggedout = await query("/logout");
  return true;
}

export default function Logout() {
  const router = useRouter();
  const [log, setlogout] = useState(false);
  if (log) router.push("/login");
  useEffect(() => {
    const fn = async () => {
      await logout();
      setlogout(true);
    };
    fn();
  }, []);
  return <></>;
}
