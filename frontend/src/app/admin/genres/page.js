import query from "@/components/query";
import GenreTable from "./genreTable";

export default async function AddGenre() {
  const data = await (await query("/genres")).json();
  console.log(data);
  return (
    <>
      <h1 className=" text-center mt-5">Genre Management</h1>
      <GenreTable data={data.data ?? []} />
    </>
  );
}
