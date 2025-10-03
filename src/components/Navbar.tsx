"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const { data: userSession } = authClient.useSession();

  return (
    <div className="flex w-full h-20 md:h-28 items-center border-b">
      <div className="container mx-auto flex justify-between p-6">
        <div>
          <Link
            href={"/"}
            className="text-primary text-3xl md:text-5xl font-bold"
          >
            My Blog
          </Link>
        </div>
        <div className="flex items-center space-x-8">
          <nav>
            <ul className="flex items-center text-sm md:text-base space-x-5 md:space-x-8">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer">
                    Blog
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuItem>
                      <Link href={"/blog"}>Blog</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/blog/posts"}>Posts</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/blog/categories"}>Categorias</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/blog/tags"}>Tags</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/blog/authors"}>Autores</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <Link href={"/contact"}>Contato</Link>
              </li>
              <li>
                <Link href={"/about"}>Sobre nós</Link>
              </li>
              <li>
                {userSession ? (
                  <Link href={"/dashboard"}>Dashboard</Link>
                ) : (
                  <Link href={"/auth/login"}>login</Link>
                )}
              </li>
              {userSession ? (
                <li>
                  <UserAvatar />
                </li>
              ) : (
                ""
              )}
            </ul>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
