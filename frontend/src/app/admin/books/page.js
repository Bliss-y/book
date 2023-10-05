import query from "@/components/query";
import Table from "./table";

export default async function Book({ searchParams }) {
  const data = await (
    await query("/book/get", { page: searchParams.page ?? 0 })
  ).json();
  const genres = (await (await query("/genres")).json()).data ?? [];
  return (
    <>
      <h1 className=" text-center mt-5">Book Management</h1>
      <Table data={data.data ?? []} genres={genres} />
    </>
  );
}
