"use client";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/modules/userContext";
import { useRouter } from "next/navigation";
import query from "@/components/query";
import Link from "next/link";
export function SidePanel() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        let res = await query("/auth/me");
        res = await res.json();
        if (res.status == "success") {
          let r = res.data;
          res = await query("/list");
          res = await res.json();
          r.list = res.data;
          console.log(r);
          if (!r.admin) {
            console.log(r);
            router.push("/login");
          }
          setLoading(false);
          setUser(r);
        } else {
          throw "err";
        }
      } catch (e) {
        console.log(e, user);
        router.push("/login");
        setUser(null);
      }
    };
    getUser();
  }, []);
  if (loading) {
    return <div>Authenticating the user ...</div>;
  } else {
    return (
      <div className="absolute h-screen flex md:w-[300px]">
        <div
          className=" transition-all duration-300 pt-[50px] overflow-x-hidden h-full bg-slate-600 text-center"
          style={{
            display: open ? "block" : "hidden",
            width: open ? "100%" : "1px",
          }}
        >
          <div className="mt-2">
            <Link href={"/"}>Main Page</Link>
          </div>
          <hr />

          <div className="mt-2">
            <Link href={"books"}>Books</Link>
          </div>
          <hr />
          <div className="mt-2">
            <Link href={"genres"}>Genres</Link>
          </div>
          <hr />
        </div>
        <div
          className="transition-all bg-slate-700 h-fit"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {!open ? "menu" : "close"}
        </div>
      </div>
    );
  }
}
