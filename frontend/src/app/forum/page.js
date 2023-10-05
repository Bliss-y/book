import query from "@/components/query";
import Navbar from "@/components/navbar";
import { Forum } from "./forums";
import Link from "next/link";

export default async function Page() {
  const forum = await (await query("/getForum")).json();

  if (!forum || !forum.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">404</div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#0f172a] w-full flex items-center justify-center">
        <div className="container mx-auto w-full items-center justify-cente px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-white">
            Top Forums in Community
          </h1>
          <div className="h-5"></div>
          <Link
            href="/addForum"
            className=" bg-green-950 hover:bg-white hover:text-black rounded-full px-5 py-2"
          >
            Add Forum
          </Link>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {forum.data.map((forumItem) => (
              <div
                key={forumItem.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <Link href={"/forum/" + forumItem._id}>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {forumItem.title}
                  </h2>
                </Link>
                <p className="text-gray-400 mb-2">{forumItem.description}</p>
                <div className="flex items-center text-sm text-gray-400">
                  <span className="mr-2">Users: {forumItem.userCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
