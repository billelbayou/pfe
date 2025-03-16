import StudentDashboard from "@/components/student-dashboard";
import { checkAuth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const auth = await checkAuth();
  if (!auth.success) redirect("/login");
  const user = auth.user;

  return user.role === "ADMIN" ? (
    <h1>Admin</h1>
  ) : (
    <StudentDashboard user={user} />
  );
}
