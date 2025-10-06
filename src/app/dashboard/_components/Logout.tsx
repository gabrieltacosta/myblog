"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Logout = () => {
  const router = useRouter();

  const logout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Deslogado com sucesso!");
          router.push("/");
        },
      },
    });
  };

  return (
    <Button
      className="cursor-pointer mx-auto border-none hover:bg-transparent"
      variant="ghost"
      onClick={logout}
    >
      <LogOutIcon className="text-red-500" />
    </Button>
  );
};

export default Logout;
