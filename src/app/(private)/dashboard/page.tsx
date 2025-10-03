import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="w-full container mx-auto min-h-dvh flex flex-col p-6">
      <h1 className="text-3xl">Dashboard Page</h1>
    </div>
  );
}
