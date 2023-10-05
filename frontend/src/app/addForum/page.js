import ForumForm from "@/components/forumform";
import Navbar from "@/components/navbar";
export default function Page() {
  return (
    <>
      <main className="flex min-h-screen w-full m-auto flex-col items-center  bg-[#0f172a]">
        <Navbar userRequired={true} />
        <div className=" md:w-[800px]">
          <h1 className=" text-center text-3xl my-2">
            Create Your Own Forum!!
          </h1>
          <hr className=" text-slate-300 text-xl w-full mb-2" />
          <div className="w-full">
            <ForumForm postTo={"/addForum"}></ForumForm>
          </div>
        </div>
      </main>
    </>
  );
}
