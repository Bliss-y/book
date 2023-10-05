"use client";
import { Form } from "./form";
import { useState } from "react";
import SearchBar from "./searchbar";
import query from "@/components/query";
export default function Table({ data, genres }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(null);
  const [d, setData] = useState([...data]);
  const [deleting, setDeleting] = useState(false);
  const changed = (data_n) => {
    if (data_n.length == 0) return setData(data);
    setData(data_n);
  };
  return (
    <>
      {editing || adding ? (
        <div className=" absolute p-5 flex-col items-center justify-center bg-slate-950">
          <h1 className=" mb-4 text-center">Edit Genre</h1>
          <Form
            value={
              editing ?? { name: "", description: "", isbn: "", genres: [] }
            }
            clearAfterSubmit={adding}
            postTo={adding ? "/book/add" : "/book/edit"}
            genres={genres}
          />
          <button
            className=" bg-red-800 rounded-full mt-4 p-2"
            onClick={() => {
              setEditing(null);
              setAdding(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <></>
      )}
      <div>
        <button
          className="bg-green-950 rounded-full p-2"
          onClick={() => {
            setEditing(null);
            setAdding(true);
          }}
        >
          Add Book
        </button>
        <SearchBar dataChanger={changed} />
      </div>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {d.map((e) => {
            return (
              <>
                <tr className=" border-b-2 border-slate-400">
                  <td>{e.name}</td>
                  <td
                    className=" cursor-pointer"
                    onClick={() => {
                      setEditing(e);
                    }}
                  >
                    Edit
                  </td>
                  <td
                    key={e._id}
                    className=" cursor-pointer"
                    onClick={async (x) => {
                      x.innerText = "Deleting  ...";
                      console.log(e);
                      const res = await (
                        await query("/admin/book/delete/" + e._id)
                      ).json();
                      if (res.status == "success") {
                        location.reload();
                        setDeleting(false);
                        x.innerText = "Delete";
                      } else {
                        console.log(res);
                      }
                    }}
                  >
                    {deleting ? "Deleting.." : "Delete"}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
