"use client";
import { UserContext } from "@/modules/userContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import query from "./query";

export function Comment({ comment }) {
  return (
    <>
      <div>
        by: {comment.user}, {comment.stars} stars
      </div>
      <div>
        <Star id={comment._id} star={comment.starred ?? false} />
      </div>
      <div>{comment.post}</div>
    </>
  );
}

export function Star({ id, star }) {
  const [clicking, setClicking] = useState(false);
  const [starred, setStarred] = useState(star);
  const className = " rounded-full bg-yellow-100 px-3 text-black";
  return (
    <>
      {clicking ? (
        <button className={className}>loadin...</button>
      ) : starred ? (
        <button
          className={" bg-yellow-400" + className}
          onClick={async () => {
            setClicking(true);
            try {
              const res = await (await query("/comment/unstar/" + id)).json();
              if (res.status && res.status == "success") {
                setStarred(false);
              }
            } catch (e) {}
            setClicking(false);
          }}
        >
          unstar
        </button>
      ) : (
        <button
          className={className}
          onClick={async () => {
            setClicking(true);
            try {
              const res = await (await query("/comment/star/" + id)).json();
              if (res.status && res.status == "success") {
                setStarred(true);
              } else {
                console.log(res.message ?? "");
              }
            } catch (e) {
              console.log(res);
            }
            setClicking(false);
          }}
        >
          star
        </button>
      )}
    </>
  );
}

export function AddComment({ id }) {
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <>
        <Link href={"/login"}>Login</Link> to add comment
      </>
    );
  }
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const body = {
            post: formData.get("post"),
          };
          try {
            const data = await fetch("http://localhost:4000/addComment/" + id, {
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
                location.reload();
                setLoggedIn((e) => true);
              }
            }
          } catch (e) {
            console.log(e);
          }
        }}
        className=" w-full border-orange-50 border-2"
      >
        <h2 className=" text-center">Add Comment</h2>
        <div className=" p-2">
          <textarea
            name="post"
            className=" w-full p-2 m-auto bg-slate-300 border-slate-700 border-2 text-black"
            placeholder="Write a Comment"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className=" rounded-full bg-orange-950 p-2 mb-3 ml-3"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export function Comments({ id, n_comments }) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [comms, setComms] = useState(null);
  useEffect(() => {
    setLoading(true);
    const getcoms = async () => {
      const res = await (await query("/comments/" + id + "/0")).json();
      if (res.status == "success") {
        setComms(res.data);
      }
      setLoading(false);
    };
    getcoms();
  }, []);
  if (loading || !comms) {
    return <div>loading comments...</div>;
  }
  return (
    <div className="w-full mt-5">
      <h1 className=" mb-2 text-3xl">Discussions</h1>
      <div>
        <AddComment id={id} />
      </div>
      <ul className=" mt-5 p-2 bg-slate-800">
        {comms.map((e) => {
          return (
            <li className=" bg-slate-600 p-2 mb-2">
              <Comment comment={e} />
            </li>
          );
        })}
      </ul>
      {
        //Pagination of comments
      }
      <div>
        <div
          onClick={async () => {
            if (page <= 0) return;
            setLoading(true);
            const res = await (
              await query("/comments/" + id + "/" + page + 1)
            ).json();
            if (res.status == "success") {
              setComms(res.data);
              setPage((e) => e + 1);
            }
            setLoading(false);
          }}
          className={"" + page <= 0 ? "hidden" : ""}
        >
          Prev
        </div>

        <div
          onClick={async () => {
            if (page >= Math.floor(n_comments / 10)) return;
            console.log(page, Math.floor(n_comments / 10));
            setLoading(true);
            const res = await (
              await query("/comments/" + id + "/" + page + 1)
            ).json();
            if (res.status == "success") {
              setComms(res.data);
              setPage((e) => e + 1);
            }
            setLoading(false);
          }}
          className={"" + page >= Math.floor(n_comments / 10) ? "hidden" : ""}
        >
          Next
        </div>
      </div>
    </div>
  );
}
