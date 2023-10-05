"use client";
import query from "@/components/query";
import { UserContext } from "@/modules/userContext";
import Link from "next/link";
import { useContext } from "react";

export function Posts({ data, id }) {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      {user && user.forums.includes(id) ? (
        <form
          className=" m-2"
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const body = {
              post: formData.get("post"),
            };
            const res = await (
              await query("/addPost/" + id, {}, "POST", body)
            ).json();
            if (res.status == "success") {
              window.location.reload();
            }
          }}
        >
          <textarea
            className=" rounded-full bg-slate-200 text-black w-full px-5 py-2"
            name="post"
            placeholder="Add a Post to this forum"
          ></textarea>
          <button
            type="submit"
            className=" ml-2 rounded-full mt-1 bg-blue-950 text-white px-5 py-2 mb-2"
          >
            Submit
          </button>
          <hr></hr>
        </form>
      ) : (
        ""
      )}
      {data.map((e) => {
        return (
          <div className=" w-full px-2 py-3 bg-slate-800 border-slate-950 border-2">
            By: <Link href={"/wall/" + e.user._id}>{e.user.username}</Link>
            {user && user.username == e.user.username ? (
              <button
                className=" bg-slate-950 rounded-full px-5 py-2 ml-[5px] mb-2"
                onClick={async (x) => {
                  x.target.innerText = "Deleting";
                  const res = await (
                    await query("/deletePost/" + e._id)
                  ).json();
                  if (res.status == "success") {
                    window.location.reload();
                  }
                  x.target.innerText = "Delete";
                }}
              >
                Delete
              </button>
            ) : (
              ""
            )}
            <hr></hr>
            <p className=" text-white">{e.post}</p>
          </div>
        );
      })}
    </>
  );
}
