import query from "@/components/query";
import Navbar from "@/components/navbar";
import { BookDetails } from "@/components/book";
import { Comments } from "@/components/comments";

export default async function Page({ params }) {
  const bookj = await (await query("/book/get/" + params.id)).json();
  return (
    <main className="flex min-h-screen w-full m-auto flex-col items-center  bg-[#0f172a]">
      <Navbar />
      <div className=" md:w-[800px]">
        <BookDetails book={bookj.data}></BookDetails>
        <hr className=" text-slate-300 text-xl w-full" />
        <div className="w-full">
          <Comments
            id={bookj?.data?._id}
            n_comments={bookj?.data?.comments || 0}
          />
        </div>
      </div>
    </main>
  );
}
