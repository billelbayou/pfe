import Logout from "@/components/logout";
import { checkAuth } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const auth = await checkAuth();
  if (!auth.success) redirect("/login");
  return (
    <div>
      <h1>Hello {auth.user.name}</h1>
      <p>Your email is {auth.user.email}</p>
      <Logout />
    </div>
  );
}
