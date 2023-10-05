"use client";
import query from "@/components/query";
import { Button } from "@mui/material";
import { useState } from "react";

export function Form({
  postTo,
  value = { name: "", description: "", isbn: "", genres: [] },
  genres,
  clearAfterSubmit = true,
}) {
  const [values, setValues] = useState({ ...value });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const formData = new FormData(e.target);
        const body = {
          name: formData.get("name"),
        };
        try {
          const res = await query(postTo, {}, "POST", values);
          const j = await res.json();
          if (j.status == "success") {
            if (clearAfterSubmit) {
              setValues({ name: "", description: "", isbn: "", genres: [] });
            }
          } else throw j;
        } catch (e) {
          console.log(e);
          setError(true);
        }
        setLoading(false);
      }}
    >
      <label>Name:</label>
      <input
        placeholder="Name"
        className=" text-black mr-2"
        name="name"
        value={values.name ?? ""}
        type="text"
        onChange={async (e) => {
          setValues({ ...values, name: e.target.value });
        }}
      />
      <label>Description:</label>
      <textarea
        placeholder="Description"
        className=" text-black mr-2"
        name="name"
        onChange={async (e) => {
          setValues({ ...values, description: e.target.value });
        }}
        value={values.description ?? ""}
      ></textarea>
      <label>ISBN:</label>
      <input
        placeholder="Isbn"
        className=" text-black mr-2"
        name="name"
        value={values.isbn ?? ""}
        onChange={async (e) => {
          setValues({ ...values, isbn: e.target.value });
        }}
      />
      <div>
        {genres.map((e) => {
          return (
            <div
              key={e._id}
              className={
                (values.genres.includes(e.name)
                  ? " bg-orange-100 text-black"
                  : "") +
                " bg-orange-950 w-fit inline-block text-white rounded-full p-2"
              }
              onClick={() => {
                if (values.genres.includes(e.name)) {
                  const gen = values.genres.filter((w) => w != e.name);
                  setValues({ ...values, genres: gen });
                } else {
                  const genres = values.genres.push(e.name);
                  setValues({ ...values });
                }
              }}
            >
              {e.name}
            </div>
          );
        })}
      </div>
      <button type="submit" className="p-2 rounded-3xl bg-green-950">
        {loading ? "Submitting.." : "Submit"}
      </button>
    </form>
  );
}
