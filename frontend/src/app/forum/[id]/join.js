"use client";

import query from "@/components/query";
import { UserContext } from "@/modules/userContext";
import { useContext, useState } from "react";

export default function JoinBtn({ id }) {
  const { user, _ } = useContext(UserContext);
  if (!user) {
    return <></>;
  }
  console.log(user.forums);
  const joined = user.forums.includes(id);
  return (
    <>
      <button
        className=" rounded-full bg-green-950 px-5 py-2"
        onClick={async () => {
          const res = await query(
            (joined ? "/leaveForum/" : "/joinforum/") + id
          );
          const js = await res.json();
          if (js.status == "success") {
            window.location.reload();
          }
        }}
      >
        {!joined ? "Join" : "Leave"}
      </button>
    </>
  );
}
