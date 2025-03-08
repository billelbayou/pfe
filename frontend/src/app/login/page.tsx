import LoginForm from "@/components/login-form";
import { checkAuth } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const auth = await checkAuth();
  if (auth.success) redirect("/");
  return <LoginForm />;
}
