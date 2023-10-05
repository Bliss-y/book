"use client";
import { UserContext } from "@/modules/userContext";
import Link from "next/link";
import { useContext, useEffect } from "react";
import query from "./query";
import { Children, useState } from "react";
import { useRouter } from "next/navigation";

export function OnclickOptions({ children }) {
  const [isClicked, setClicked] = useState(false);
  const c = Children.toArray(children);
  return (
    <>
      <div onClick={() => setClicked((e) => !isClicked)}>{c[0]}</div>
      {isClicked ? <div> {c[1]} </div> : <></>}
    </>
  );
}

export default function Navbar({
  genres,
  admin = false,
  userRequired = false,
}) {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
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
          if (admin && !r.admin) {
            router.push("/login");
          }

          setUser(r);
        } else {
          if (userRequired || admin) {
            router.push("/login");
          }
          throw "err";
        }
      } catch (e) {
        if (admin) {
          router.push("/login");
        }
        setUser(null);
      }
    };
    getUser();
  }, []);
  return (
    <nav className="flex w-full text-slate-300 justify-between pl-24 pr-24 items-center bg-[#1e293b]  h-12">
      <Link href="/">Home</Link>
      <Link href="/genres">Genres</Link>
      <Link href="/browse">Browse</Link>
      <Link href="/forum">Forums</Link>

      {user ? (
        <div href="/profile">
          <OnclickOptions>
            <span className=" cursor-pointer">
              <span className=" underline">{user.username}</span>▼
            </span>
            <div className="  absolute bg-slate-400">
              <div>
                Name: {user.fname} {user.lname}
                <br></br>
                <hr></hr>
                <Link href={"/wall/" + user._id} className=" underline">
                  Your Wall
                </Link>
              </div>
              <hr></hr>
              {user.admin ? (
                <>
                  <Link className="underline" href="/admin/genres">
                    Admin Dashboard
                  </Link>
                  <hr></hr>
                </>
              ) : (
                <></>
              )}
              <Link className="underline" href="/profile">
                profile
              </Link>
              <hr></hr>
              <Link className="underline" href="/list">
                Lists
              </Link>
              <hr></hr>
              <div
                className="underline cursor-pointer"
                onClick={async () => {
                  const loggedout = await query("/auth/logout");
                  router.push("/login");
                  setUser(null);
                }}
              >
                Logout
              </div>
            </div>
          </OnclickOptions>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
