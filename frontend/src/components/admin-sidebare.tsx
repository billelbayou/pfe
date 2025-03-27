"use client"; // Mark this component as a client component

import { useActionState } from "react";
import { logout } from "@/lib/logout";
import Link from "next/link";

export default function Sidebar() {
  const [error, dispatch] = useActionState(logout, null);

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-blue-600 text-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Transcript App</h1>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center p-4 hover:bg-blue-700 transition duration-300"
            >
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/student/create-transcript"
              className="flex items-center p-4 hover:bg-blue-700 transition duration-300"
            >
              <span className="ml-2">Students Management</span>
            </Link>
          </li>
          <li>
            <Link
              href="/student/view-transcripts"
              className="flex items-center p-4 hover:bg-blue-700 transition duration-300"
            >
              <span className="ml-2">Transcripts Management</span>
            </Link>
          </li>
          <li>
            <form action={dispatch} className="w-full">
              <button
                type="submit"
                className="flex items-center w-full p-4 cursor-pointer hover:bg-blue-700 transition duration-300 text-left"
              >
                <span className="ml-2">Logout</span>
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </div>
  );
}
