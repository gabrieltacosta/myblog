import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!userSession) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
