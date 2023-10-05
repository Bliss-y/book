"use client";
import Image from "next/image";
import Card from "@/components/card";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/modules/userContext";
import { AddToListList, getList } from "@/components/list";
import { OnclickOptions } from "./navbar";
import Link from "next/link";
import { Rate } from "./rate";

export function BookListItem({ book, className = "" }) {
  return (
    <div className={className + " w-full border-[2px] p-2"}>
      <Link href={"/book/" + book._id}>{book.name}</Link>
      <div>Genres: {book.genres.join(", ")}</div>
      <p>{book.description.substring(0, 25)}...</p>
    </div>
  );
}

export const BookList = ({ data, list }) => {
  return (
    <>
      {data.map((e) => {
        const main_img =
          e.image ?? "https://cdn-icons-png.flaticon.com/512/5773/5773749.png";
        const { _id, description, name, isbn, genres } = e;
        return (
          <div
            className="mb-2 bg-slate-500 w-full h-[150px] "
            style={{
              backgroundImage: "url('" + main_img + "')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            <Card>
              <div className=" p-2 flex-col justify-between">
                <Link href={"/book/" + _id}>
                  <h3 className=" bg-white font-semibold text-black p-2">
                    {name}
                  </h3>
                </Link>
                {list ? (
                  <div className=" ml-auto">
                    <OnclickOptions>
                      <div className=" mt-2 cursor-pointer w-fit p-1 text-xl bg-slate-700">
                        +
                      </div>
                      <div className="absolute z-50 bg-slate-950 p-2">
                        <AddToListList lists={list} book={e._id} />
                      </div>
                    </OnclickOptions>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                className="bg-slate-400 absolute p-2"
                style={{ width: "200px" }}
              >
                <h4>isbn: {isbn}</h4>
                <h4 className=" bg-slate-800 text-white">
                  Genres: {genres?.join(", ")}
                </h4>
                <h4 className="text-lg underline">Description</h4>
                <p className="bg-slate-300 text-slate-950 p-2">
                  {description.substring(0, 100)} ...
                </p>
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export const BookDetails = ({ book }) => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="w-[900px] flex-col justify-center text-center items-center">
      <h1 className="text-[30px]">
        Book:
        {book.name} {book.author?.name ?? ""}
      </h1>
      <h2>
        Rated: {book.rating} by : {book.raters} raters
      </h2>
      <img
        src={
          book.img ?? "https://cdn-icons-png.flaticon.com/512/5773/5773749.png"
        }
        className=" h-[120px] m-auto"
      />
      {user ? (
        <>
          <span>Rate this book: </span>
          <Rate
            rating={book.userRating}
            id={book._id}
            className=" flex m-auto w-fit"
          ></Rate>
          <OnclickOptions>
            <div className=" text-base bg-slate-800">
              Add to List {">"} <hr></hr>
            </div>
            <div className=" z-50 bg-slate-800">
              <AddToListList lists={user.list} book={book._id} />
            </div>
          </OnclickOptions>
        </>
      ) : (
        <></>
      )}
      <hr></hr>
      <div>
        <p>{book.description}</p>
        {book.image ? <Image src={book.img}></Image> : <></>}
      </div>
    </div>
  );
};
