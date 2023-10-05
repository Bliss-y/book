"use client";
import Navbar, { OnclickOptions } from "@/components/navbar";
import Image from "next/image";
import query from "@/components/query";
import Card from "@/components/card";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/modules/userContext";
import { AddToListList, getList } from "@/components/list";
import { BookList } from "@/components/book";
export default function Home() {
  const { user, _ } = useContext(UserContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    var getData = async () => {
      try {
        let dd = await query("/book/get", {
          fields: ["id", "description", "name", "isbn", "genres"].join(" "),
        });
        dd = await dd.json();
        setData((e) => dd);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <main className="flex min-h-screen items-center flex-col w-full bg-[#0f172a]">
      <Navbar />

      <div className=" items-center text text-slate-300 h-full w-[300px]">
        <h1 className="text-center p-2 m-2 text-5xl">Latest Books</h1>
        {!data || data.status == "error" ? (
          <>{"Network Error"}</>
        ) : (
          <div className="">
            <BookList
              data={data.data}
              list={user ? user.list : null}
            ></BookList>
          </div>
        )}
      </div>
    </main>
  );
}
