import LoginForm from "@/components/login-form";
import { checkAuth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const auth = await checkAuth();
  console.log(auth);
  if (auth.success) redirect("/");
  return <LoginForm />;
}
