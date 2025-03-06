"use server";
import { cookies } from "next/headers";

export async function getToken() {
  const myCookies = await cookies();
  const token = myCookies.get("token")?.value;
  return token || null;
}
