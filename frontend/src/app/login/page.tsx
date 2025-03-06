"use client";

import { login } from "@/lib/actions";
import { useActionState } from "react";

export default function LoginPage() {
  const [error, dispatch, isPending] = useActionState(login, null);
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-3xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>

        <form className="space-y-5 mt-5" action={dispatch}>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Sign In"}
          </button>
        </form>
        {error && (
          <p className="text-sm text-red-500 text-center mt-4">
            {error.message}
          </p>
        )}

        <p className="text-sm text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-400 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
