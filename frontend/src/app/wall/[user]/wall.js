"use client";
import query from "@/components/query";
import { UserContext } from "@/modules/userContext";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";

export default function Wall({ data, u }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      {user && user._id == u._id ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const body = {
              post: formData.get("post"),
            };
            const added = await (
              await query("/addwall", {}, "POST", body)
            ).json();
            if (added && added.status == "success") {
              window.location.reload();
            }
          }}
        >
          <label>Add A post you your wall</label>
          <br></br>
          <br></br>

          <textarea
            name="post"
            className="text-black rounded-full p-2 w-full "
          ></textarea>
          <br></br>
          <br></br>

          <button
            type="submit"
            className="text-white bg-gray-400 p-2 rounded-full"
          >
            {" "}
            Submit
          </button>
        </form>
      ) : (
        ""
      )}
      {data.map((e) => {
        return (
          <>
            <div>
              <h3>
                Posted On: {e.date}{" "}
                {user && user._id == u._id ? (
                  <button
                    onClick={async () => {
                      const deleted = await (
                        await query("/deleteWall/" + e._id)
                      ).json();
                      if (deleted && deleted.status == "success") {
                        window.location.reload();
                      }
                    }}
                  >
                    Delete
                  </button>
                ) : (
                  <></>
                )}
              </h3>

              <p>data {e.post}</p>
            </div>
            <hr></hr>
          </>
        );
      })}
    </>
  );
}
