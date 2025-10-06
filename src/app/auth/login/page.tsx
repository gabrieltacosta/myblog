import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./_components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar"
}

const LoginPage = async () => {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (userSession) {
    redirect("/dashboard");
  }
  return (
    <div className="container mx-auto h-dvh flex flex-col items-center justify-center p-6">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
