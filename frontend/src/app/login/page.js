"use client";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);

  const [error, setError] = useState({ sate: false, message: "" });
  if (loggedIn) {
    router.push("/");
  }
  return (
    <main className="flex min-h-screen flex-col items-center  h- bg-[#0f172a]">
      <Navbar />
      <form
        className="flex flex-col text text-slate-300 h-full p-10 rounded-3xl border-2 min-w-fit my-auto"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const body = {
            email: formData.get("email"),
            password: formData.get("password"),
          };
          try {
            const data = await fetch("http://localhost:4000/auth/login", {
              method: "POST",
              credentials: "include",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });
            if (data) {
              const jsondata = await data.json();
              if (jsondata.status == "success") {
                setLoggedIn((e) => true);
              } else {
                throw { data };
              }
            }
          } catch (e) {
            setError({
              status: true,
              message: "Invalid user or password!",
            });
            console.log(e);
          }
        }}
      >
        <h1 className=" text-3xl mb-5">Login</h1>
        <div>
          <label>email:</label>
          <br></br>
          <input className="text-slate-900 pl-5" type="text" name="email" />
        </div>
        <hr className=" mt-2"></hr>
        <div className=" mt-2">
          <label>password:</label>
          <br></br>
          <input
            className="text-slate-900 pl-5"
            type="password"
            name="password"
          />
        </div>
        <hr className=" mt-2"></hr>
        <button
          type="submit"
          className="px-5 py-2 rounded-full mt-2 bg-green-950 w-fit m-auto"
        >
          {isLoading ? "Submitting" : "Submit"}
        </button>
        {error.message ? (
          <div className=" text-red-400"> {error.message}</div>
        ) : (
          <></>
        )}
        <div>Not a member yet?</div>
        <Link href={"/register"} className="underline">
          Register
        </Link>
      </form>
    </main>
  );
}
