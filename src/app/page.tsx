import { ModeToggle } from "@/components/mode-toggle";
import Logout from "./dashboard/_components/Logout";

export default function Home() {
  return (
    <div className="w-full min-h-dvh flex flex-col">
      <h1 className="text-3xl">Hello world!</h1>
      <ModeToggle />
      <Logout />
    </div>
  );
}
