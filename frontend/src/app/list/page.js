"use client";
import { UserContext } from "@/modules/userContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Navbar from "@/components/navbar";
import { OnclickOptions } from "@/components/navbar";
import { BookList } from "@/components/book";
import query from "@/components/query";

function AddListForm() {
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {
          name: formData.get("name"),
        };
        const res = await (await query("/list/new", {}, "POST", body))?.json();
        if (res.status == "success") {
          window.location.reload();
        }
        if (res.status == "error") {
          console.log(res);
        }
      }}
      className=" border m-2"
    >
      <h1>Create new</h1>
      <label className=" m-2">New List name:</label>
      <input className=" pl-1 text-blue-950" type="text" name="name"></input>
      <button
        type="submit"
        className=" m-2 p-2 bg-blue-950 text-blue-400 rounded-xl"
      >
        Add new
      </button>
    </form>
  );
}

export function List() {
  const { user, setUser } = useContext(UserContext);
  if (!user) {
    return <>Authenticating ...</>;
  }
  const lists = user.list;

  const [currentList, setCurrent] = useState(lists[0]);
  return (
    <>
      <h1>Lists Of {user.username}</h1>
      <hr></hr>
      <AddListForm></AddListForm>
      <OnclickOptions>
        <div>
          <div className=" cursor-pointer">+ {currentList.name}</div>
          {currentList.deletable ? (
            <button
              onClick={async () => {
                const res = await (
                  await query("/list/delete/" + currentList._id)
                ).json();
                if (res.status == "success") {
                  window.location.reload();
                }
              }}
            >
              Delete This List
            </button>
          ) : (
            <></>
          )}
        </div>
        <div>
          {lists.map((e) => {
            return (
              <div
                className=" pl-2 cursor-pointer"
                onClick={() => {
                  setCurrent(e);
                }}
              >
                {e.name}
                <hr></hr>
              </div>
            );
          })}
        </div>
      </OnclickOptions>
      <div className="flex">
        <BookList data={currentList.books} list={lists}></BookList>
      </div>
    </>
  );
}

export default function ListPage() {
  return (
    <main className="flex flex-col min-h-screen items-center text-slate-300 bg-[#0f172a]">
      <Navbar />
      <div>
        <List></List>
      </div>
      <div></div>
    </main>
  );
}
