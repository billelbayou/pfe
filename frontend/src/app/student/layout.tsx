import { checkAuth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await checkAuth();
  if (!auth.success) redirect("/login");
  return <>{children}</>;
}
