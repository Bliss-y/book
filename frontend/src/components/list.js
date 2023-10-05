"use client";
import contains from "@/modules/contains";
import query from "./query";
import { useState } from "react";

export async function getBookFromList(list_id) {
  return await (
    await query("/list/add_books", {}, "POST", {
      book: book_id,
      list: list_id,
    })
  ).json();
}

export async function addBookToList(book_id, list_id) {
  return await (
    await query("/list/add_books", {}, "POST", {
      book: book_id,
      list: list_id,
    })
  ).json();
}

export async function removeBookFromList(book_id, list_id) {
  return await (
    await query("/list/remove_books", {}, "POST", {
      book: book_id,
      list: list_id,
    })
  ).json();
}

export async function getList() {
  return await (await query("/list")).json();
}

export default function AddToListItem({ list, book_id }) {
  const [adding, setAdding] = useState(false);

  const [includes, setIncludes] = useState(
    contains(list.books, book_id, (i, x) => {
      return i._id == x;
    })
  );
  return (
    <div
      className=" cursor-pointer"
      onClick={async () => {
        {
          setAdding(true);
          let res = null;
          if (includes) {
            res = await removeBookFromList(book_id, list._id);
          } else {
            res = await addBookToList(book_id, list._id);
          }
          if (res.status == "success") setIncludes(!includes);
          setAdding(false);
        }
      }}
    >
      {adding
        ? includes
          ? "removing..."
          : "adding..."
        : includes
        ? "-" + list.name
        : "+" + list.name}
    </div>
  );
}

export function AddToListList({ lists, book }) {
  return (
    <div>
      {lists.map((e) => {
        return (
          <div className="cursor-pointer">
            <AddToListItem list={e} book_id={book} />
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
}
