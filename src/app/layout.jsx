"use client";

import "./globals.css";
import "@glidejs/glide/dist/css/glide.core.min.css";
import Link from 'next/link';
import Image from "next/image";
import { useState } from "react";
import { Menu } from "iconoir-react";
import Button from "@/components/button";

export default function RootLayout({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <nav className="bg-primary sticky top-0 w-full z-[100]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link
              href="/"
              className="mr-4 block cursor-pointer py-1.5 text-base text-white font-semibold flex gap-3 place-items-center"
            >
              <Image src="/logo.png" alt="HMRC logo" width="30" height="30" />
              Leadership & Management Academy
            </Link>
            <div className="items-center hidden gap-x-2 lg:flex">
              <form className="w-full flex gap-3" action="/search.html">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  id="search"
                  name="query"
                  type="text"
                  autoComplete="off"
                  defaultValue=""
                  className="min-w-[300px] rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary text-sm/6"
                  placeholder="Search for articles, learning and more..."
                />
                <Button type="submit" variant="white">Search</Button>
              </form>
            </div>
            <button
              className="relative align-middle lg:hidden text-white"
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Menu />
            </button>
          </div>
        </nav>
        {isSearchOpen && (
          <div className="lg:hidden bg-white p-4 sticky top-[90px] z-[100]">
            <form className="w-full flex gap-3" action="/search.html">
              <label htmlFor="mobile-search" className="sr-only">
                Search
              </label>
              <input
                id="mobile-search"
                name="query"
                type="text"
                autoComplete="off"
                defaultValue=""
                className="w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary text-sm/6"
                placeholder="Search for articles, learning and more..."
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
