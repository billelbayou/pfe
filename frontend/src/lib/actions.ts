
import { redirect } from "next/navigation";
import { getToken } from "./token";

export const API_URL = "http://localhost:5000";

export const login = async (previousState: unknown, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      return data;
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    return { success: false, message: "Internal server error" };
  }
  redirect("/");
};

export const checkAuth = async () => {
  const token = await getToken();

  const res = await fetch("http://localhost:5000/api/auth/check-auth", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    },
    credentials: "include", // Still include cookies (optional)
  });
  const data = await res.json();
  return data;
};

