"use client";

import { logout } from "@/lib/logout";
import { useActionState } from "react";

export default function Logout() {
  const [error, dispatch] = useActionState(logout, null);
  return (
    <form action={dispatch}>
      <button type="submit">Logout</button>
    </form>
  );
}
