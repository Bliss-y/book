"use client";
import query from "@/components/query";
import Link from "next/link";

import { useState } from "react";

export default function SearchBar({ g }) {
  const [searchResult, setResult] = useState();
  const [genre, setGenre] = useState(g);
  return (
    <>
      <form method="GET" action="/browse">
        <input
          type="search"
          name="q"
          placeholder="Search ..."
          className=" text-slate-900 bg-slate-50 p-2 w-80"
          autoComplete="off"
          onInput={async (e) => {
            try {
              const q = {
                q: e.target.value,
              };
              if (genre) {
                q.genre = genre;
              }
              const res = await query("/qsearch", q);
              const j = await res.json();
              if (j.data) {
                setResult(j.data);
              }
            } catch (e) {}
          }}
        />
        <input
          type="submit"
          value="Submit"
          className="bg-[red] rounded-full p-2 m-3 hover:bg-cyan-600"
        ></input>
      </form>
      {searchResult ? (
        <div className="">
          <ul className="absolute w-44 bg-slate-900">
            {searchResult.map((e) => {
              return (
                <>
                  <Link href={"/book/" + e._id} className="w-fit">
                    <li className="w-fit">{e.name}</li>
                    <hr></hr>
                  </Link>
                </>
              );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
