import { NextResponse } from "next/server";

const ID = "jason";
const PW = "dunamu0403";

export function middleware(req) {
  const auth = req.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic") {
      const decoded = atob(encoded);
      const [id, pw] = decoded.split(":");
      if (id === ID && pw === PW) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Tokyo Trip"' },
  });
}
