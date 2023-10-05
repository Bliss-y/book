"use client";
import query from "@/components/query";
import { Button } from "@mui/material";
import { useState } from "react";

export function GenreForm({
  postTo,
  value = { name: "" },
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
              setValues({ name: "" });
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
        placeholder="Genre Name"
        className=" text-black mr-2"
        name="name"
        value={values.name ?? ""}
        onChange={async (e) => {
          setValues({ ...values, name: e.target.value });
        }}
      />
      <button type="submit" className="p-2 rounded-3xl bg-green-950">
        {loading ? "Submitting.." : "Submit"}
      </button>
    </form>
  );
}
