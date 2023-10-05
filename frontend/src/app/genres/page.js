import Navbar from "@/components/navbar";
import Link from "next/link";
import query from "@/components/query";

export default async function Genres() {
  const data = (await (await query("/genres")).json()).data;
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center  bg-[#0f172a] text-white">
      <Navbar />
      <h1 className="text-3xl mb-2">Genres List</h1>
      <table className="w-full ">
        <thead>
          <tr>
            <th className="py-2 px-4 text-3xl">Genre</th>
            <th className="py-2 px-4 text-3xl">Registered Books</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <>
              <tr key={e.name} className=" border-b-2 border-white text-center">
                <td className="py-2 px-4">
                  <Link href={"/browse?genre=" + e.name}>{e.name}</Link>
                </td>
                <td className="py-2 px-4">{e.registered_books} book/s</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </main>
  );
}
