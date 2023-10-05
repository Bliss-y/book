"use client";
import { UserContext } from "@/modules/userContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import query from "./query";
export default function ForumForm({
  value = { title: "", description: "", private: false },
  postTo,
}) {
  const [values, setValues] = useState({ ...value });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  return (
    <form
      className=" text-center justify-center w-100"
      onSubmit={async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
          const res = await query(postTo, {}, "POST", values);
          console.log(res);
          const j = await res.json();
          if (j.status == "success") {
            if (clearAfterSubmit) {
              setValues({ title: "", description: "" });
            }
          } else throw j;
        } catch (e) {
          console.log(e);
          setError(true);
        }
        router.push("/forum");
        setLoading(false);
      }}
    >
      <div className=" my-2 text-center">
        <label className=" mr-2">Name:</label>
        <br />
        <input
          placeholder="Name"
          className=" text-black mr-2 rounded-full bg-slate-300 py-2 px-5"
          name="title"
          value={values.title ?? ""}
          type="text"
          onChange={async (e) => {
            setValues({ ...values, title: e.target.value });
          }}
        />
      </div>
      <div className=" text-center">
        <label>Description:</label>
        <br />
        <textarea
          placeholder="Description"
          className=" text-black ml-2 rounded-full w-[300px] bg-slate-300 px-5 py-2"
          name="description"
          onChange={async (e) => {
            setValues({ ...values, description: e.target.value });
          }}
          value={values.description ?? ""}
        ></textarea>
      </div>
      <div className=" w-full">
        <button
          type="submit"
          className="p-2 rounded-3xl block w-fit m-auto bg-green-950"
        >
          {loading ? "Submitting.." : "Submit"}
        </button>
      </div>
    </form>
  );
}
