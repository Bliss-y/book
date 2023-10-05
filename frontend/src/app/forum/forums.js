import Link from "next/link";

export function Forum({ data }) {
  if (data.length == 0) {
    return (
      <>
        <h1>
          There Are No Forums Created. Start your own.{" "}
          <Link href={"/addForum"}>Create</Link>{" "}
        </h1>
      </>
    );
  }
  return (
    <>
      {data.map((e) => {
        return (
          <>
            <Link href={"/forum/" + e._id}>{e.title} </Link>
            <div>{e.userCount} user/s</div>
            <div>{e.description}</div>
          </>
        );
      })}
    </>
  );
}
