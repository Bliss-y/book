import Navbar from "@/components/navbar";
import query from "@/components/query";
import SearchBar from "./searchbar";
import { useRouter } from "next/navigation";
import { BookListItem } from "@/components/book";
import { List } from "../list/page";
import Link from "next/link";

export default async function Browse({ searchParams }) {
  let q = null;
  let genre = null;
  let page = searchParams.page ?? 0;
  if (searchParams.q || searchParams.genre) {
    q = searchParams.q;
    genre = searchParams.genre;
  }
  const url =
    "/browse?" + new URLSearchParams({ q: q ?? "", genre: genre ?? "" });
  let data;
  if (q) {
    console.log("Here");
    data = await (
      await query("/search", genre ? { q, genre, page } : { q, page })
    ).json();
    data = data.data;
  } else {
    data = await (
      await query(
        "/book/get",
        genre
          ? {
              fields: "name description _id author genres",
              genre,
              page,
              sort: "rating",
            }
          : {
              fields: "name description _id author genres",
              page,
              sort: "rating",
            }
      )
    ).json();
    data = data.data;
  }
  return (
    <main className="flex min-h-screen flex-col items-center  bg-[#0f172a]">
      <Navbar />
      <div>
        <div className=" my-4">
          <SearchBar />
        </div>
        <h3 className=" mb-4 text-xl">
          {q ? "Search results for " + q : " Top Searched Books"}
        </h3>
        {!data || data.length == 0 ? (
          <h3>Could not find {q}</h3>
        ) : (
          data.map((e) => {
            return <BookListItem className="text-center" book={e} />;
          })
        )}
      </div>
      <div className=" w-[300px] flex justify-between mt-5">
        <Link href={url + "&page=" + (page - 1 < 0 ? "" : page - 1)}>
          <button className=" ml-auto rounded-full bg-slate-800 p-4">
            {"<"}
            Previous
          </button>
        </Link>
        <Link href={url + "&page=" + (page == "" ? 1 : parseInt(page) + 1)}>
          <button className=" ml-auto rounded-full bg-slate-800 p-4">
            Next {">"}
          </button>
        </Link>
      </div>
    </main>
  );
}
