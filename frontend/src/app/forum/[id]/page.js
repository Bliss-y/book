import Navbar from "@/components/navbar";
import query from "@/components/query";
import { Posts } from "./posts";
import JoinBtn from "./join";

export default async function Page({ params, searchParams }) {
  const data = await (
    await query("/getForumposts/" + params.id + "/" + (searchParams.page ?? 0))
  ).json();
  if (!data || !data.data) {
    return <div>404</div>;
  }
  return (
    <main className="flex min-h-screen w-full m-auto flex-col items-center  bg-[#0f172a]">
      <Navbar />
      <div className=" md:w-[800px]">
        <h1 className=" text-center text-3xl p-2">{data.data.forum.title}</h1>
        <hr />
        <p className=" text-center">{data.data.forum.description}</p>
        <JoinBtn id={params.id}></JoinBtn>
        <hr></hr>
        <h1 className=" text-3xl">Posts:</h1>
        <Posts data={data.data.posts} id={params.id} />
      </div>
    </main>
  );
}
