import Sidebar from "@/components/admin-sidebare";
import { checkAuth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const auth = await checkAuth();
  if (!auth.success) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">{children}</main>
    </div>
  );
}
