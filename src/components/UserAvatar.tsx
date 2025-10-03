"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { authClient } from "@/lib/auth-client";
import Logout from "@/app/(private)/dashboard/_components/Logout";

export default function UserAvatar() {
  const { data: userSession } = authClient.useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarFallback>
              {userSession?.user.name.split(" ")[0][0].toUpperCase()}
            </AvatarFallback>
            <AvatarImage src={userSession?.user.image as string} />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{userSession?.user.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>

            Sair
            <DropdownMenuShortcut>
              <Logout />
            </DropdownMenuShortcut>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
