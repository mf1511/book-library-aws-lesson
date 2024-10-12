import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-slate-800 text-white">
      <h1 className="text-2xl font-bold">Bookstore</h1>
      <nav>
        <ul className="flex gap-4 space-x-6">
          <li className="hover:text-slate-300 transition-colors duration-300 items-center flex">
            <Link className="hover:text-slate-300" href="/">
              Home
            </Link>
          </li>
          <li>
            <Button>
              <Link href="/add">Add Book</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
