"use client";
import query from "@/components/query";
import Link from "next/link";

import { useState } from "react";
export default function SearchBar({ dataChanger, page = 0 }) {
  const [searchResult, setResult] = useState();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="search"
          name="q"
          autoComplete="off"
          placeholder="Search ..."
          className=" text-slate-900 bg-slate-50 p-2"
          onInput={async (e) => {
            try {
              const res = await query("/search", { q: e.target.value });
              const j = await res.json();
              if (j.data) {
                dataChanger(j.data);
              }
            } catch (e) {}
          }}
        />
      </form>
    </>
  );
}
