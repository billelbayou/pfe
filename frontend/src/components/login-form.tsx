"use client";

import { login } from "@/lib/auth-actions";
import { useActionState } from "react";

export default function LoginForm() {
  const [error, dispatch, isPending] = useActionState(login, null);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 to-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Sign In
        </h2>

        <form className="space-y-6 mt-6" action={dispatch}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md disabled:bg-blue-400"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && (
          <p className="text-sm text-red-500 text-left mt-4">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}
