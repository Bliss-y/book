"use client";
import { GenreForm } from "./genreForm";
import { useState } from "react";
export default function GenreTable({ data }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(null);
  return (
    <>
      {editing || adding ? (
        <div className=" absolute p-5 flex-col items-center justify-center bg-slate-950">
          <h1 className=" mb-4 text-center">Edit Genre</h1>
          <GenreForm
            value={editing}
            clearAfterSubmit={adding}
            postTo={adding ? "/admin/genre/add" : "/admin/genre/edit"}
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
      <button
        className="bg-green-950 rounded-full p-2"
        onClick={() => {
          setEditing(null);
          setAdding(true);
        }}
      >
        Add Genre
      </button>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
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
                  <td className=" cursor-pointer">Delete</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
