"use server";

import { cookies } from "next/headers";

export const logout = async (previousState: unknown, formData: FormData) => {
  const myCookies = await cookies();
  myCookies.delete("token");
};
