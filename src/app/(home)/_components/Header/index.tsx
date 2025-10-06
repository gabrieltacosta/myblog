import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col w-full h-20 justify-center border-b mb-10">
      <div className="container mx-auto flex justify-between items-center p-6">
        <div><Link href={"/"}>Logotipo</Link></div>
        <div className="flex items-center gap-4">
          <div>
            <nav>
              <ul className="flex space-x-6">
                <li>Home</li>
                <li>Posts</li>
                <li>Contato</li>
                <li>Sobre</li>
                <li>Dashboard</li>
              </ul>
            </nav>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
