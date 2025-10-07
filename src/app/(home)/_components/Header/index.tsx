'use client'

import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'Posts',
    url: '/posts'
  },
  {
    name: 'Contato',
    url: '/contact'
  },
  {
    name: 'Sobre',
    url: '/about'
  },
  {
    name: 'Dashboard',
    url: '/dashboard'
  },
]

const Header = () => {

  const pathName = usePathname()


  return (
    <div className="flex flex-col w-full h-20 justify-center border-b mb-10">
      <div className="container mx-auto flex justify-between items-center p-6">
        <div><Link href={"/"}>Logotipo</Link></div>
        <div className="flex items-center gap-4">
          <div>
            <nav>
              <ul className="flex space-x-6">
                {menuItems.map((item, index) => (
                  <li key={index} className={`${pathName === item.url ? "border-b text-primary/70" : ""} hover:border-b hover:text-primary/70 transition-all ease-linear`}>
                    <Link href={item.url}>{item.name}</Link>
                  </li>
                ))}
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
