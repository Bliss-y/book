export default async function query(path, params, method = "GET", body) {
  if (method == "POST" && !body) {
    throw "post method requires body";
  }
  const headers = {};
  if (method == "POST") {
    body = JSON.stringify(body);

    headers["Content-Type"] = "application/json";
    const res = await fetch(
      "http://localhost:4000" + path + new URLSearchParams(params),
      {
        method: "POST",
        credentials: "include",
        headers,
        body: body,
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );
    return res;
  }
  const res = await fetch(
    "http://localhost:4000" + path + "?" + new URLSearchParams(params),
    { credentials: "include", cache: "no-cache", next: { revalidate: 0 } }
  );
  return res;
}
