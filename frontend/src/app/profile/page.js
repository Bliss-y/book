"use client";
import { useContext, useState } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { UserContext } from "@/modules/userContext";
export default function Register() {
  const [error, setError] = useState({ sate: false, message: "" });
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center  h- bg-[#0f172a]">
      <Navbar />
      {!user ? (
        <h1 className=" text-3xl">Authenticating</h1>
      ) : (
        <form
          className="flex flex-col text text-slate-300 w-max my-auto border-2 rounded-3xl p-10"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const body = {
              email: formData.get("email"),
              lname: formData.get("lname"),
              fname: formData.get("fname"),
              username: user.username,
              password: formData.get("password"),
            };
            try {
              const data = await fetch("http://localhost:4000/auth/editUser", {
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
                  router.push("/login");
                } else {
                  setError({
                    status: true,
                    message: "Please fill the form properly!",
                  });
                }
              }
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <h1 className=" text-2xl mb-2">Register</h1>
          <label>First Name:</label>
          <input
            className="text-slate-900 pl-2"
            type="text"
            name="fname"
            value={user.fname}
          />
          <hr className=" w-full h-0.5 mt-2 text-white bg-white"></hr>
          <label>Last Name:</label>
          <input
            className="text-slate-900 pl-2"
            type="text"
            name="lname"
            value={user.lname}
          />
          <hr className=" w-full h-0.5 mt-2 text-white bg-white"></hr>
          <label>Username:</label>
          <div>{user.username}</div>
          <hr className=" w-full h-0.5 mt-2 text-white bg-white"></hr>
          <label>email:</label>
          <input
            className="text-slate-900 pl-2"
            value={user.email}
            type="text"
            name="email"
          />
          <hr className=" w-full h-0.5 mt-2 text-white bg-white"></hr>
          <label>password:</label>
          <input
            className="text-slate-900 pl-2"
            type="password"
            name="password"
          />
          <hr className=" w-full h-0.5 mt-2 text-white bg-white"></hr>
          <button
            type="submit"
            className="bg-green-900 m-auto mt-2 rounded-full px-5 py-2"
          >
            Submit
          </button>
          {error.message ? (
            <div className=" text-red-400"> {error.message}</div>
          ) : (
            <></>
          )}
        </form>
      )}
    </main>
  );
}
