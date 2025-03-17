import { checkAuth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const auth = await checkAuth();
  if (!auth.success) redirect("/login");
  const user = auth.user;

  if (user.role === "STUDENT") {
    redirect("/student");
  }
}
