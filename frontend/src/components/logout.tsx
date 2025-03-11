"use client";

import { logout } from "@/lib/logout";
import { useActionState } from "react";

export default function Logout() {
  const [error, dispatch] = useActionState(logout, null);
  return (
    <form action={dispatch}>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
      >
        Logout
      </button>
    </form>
  );
}
