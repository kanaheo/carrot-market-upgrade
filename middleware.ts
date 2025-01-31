import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  console.log(session);
  console.log("Hi im middleware");
}
