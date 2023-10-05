import query from "@/components/query";
import Navbar from "@/components/navbar";
import Wall from "./wall";

export default async function Page({ params, searchParams }) {
  const wall = await (
    await query(`/wall/user/${params.user}/?page=${searchParams.page ?? 0}`)
  ).json();
  console.log(wall);

  if (!wall || !wall.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-4xl text-red-500">404</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white w-full ">
      <Navbar />
      <div className="container mx-auto py-8 w-[800px]  text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold mb-4 text-white">
          Wall Of {wall.data.user.username}
        </h1>
        <hr className="border-t border-slate-300 mb-6  text-white " />
        <div className="w-full">
          <Wall
            data={wall.data.walls}
            u={wall.data.user}
            className=" text-white"
          />
        </div>
      </div>
    </div>
  );
}
