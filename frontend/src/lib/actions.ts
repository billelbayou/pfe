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
    if (!data.success) {
      return data;
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    return { success: false, message: "Internal server error" };
  }
  redirect("/");
};

export const checkAuth = async () => {
  try {
    const token = await getToken();

    if (!token) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await fetch("http://localhost:5000/api/auth/check-auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
      credentials: "include", // Still include cookies (optional)
    });

    if (!res.ok) {
      return { success: false, message: "Failed to verify authentication" };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
};
