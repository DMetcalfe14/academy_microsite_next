"use client";

import "./globals.css";
import "@glidejs/glide/dist/css/glide.core.min.css";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import useScorm from '@/hooks/useSCORM';

import Image from "next/image";
import { Menu } from "iconoir-react";
import Button from "@/components/button";

export default function RootLayout({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { setScormData } = useScorm();

  const searchParams = useSearchParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchData = async (source, idKey) => {
      try {
        const response = await fetch(`./${source}.json`);
        const data = await response.json();
        const id = Number(searchParams.get(idKey));

        if (id) {
          const item = data.find(item => item.id === id);

          if (item) {
            setTitle(item.title);

            switch (pathname) {
              case '/details':
                console.log(`Viewed the course details for "${item.title}"`);
                break;
              case '/discover':
                console.log(`Exploring the material within "${item.title}"`);
                break;
              case '/page':
                console.log(`Accessed the page "${item.title}"`);
                break;
              default:
                console.log(`Viewed item "${item.title}"`);
            }
          } else {
            console.log(`No item found for ID: ${id}`);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (['/details'].includes(pathname)) {
      fetchData('courses', 'id');
    } else if (pathname === '/discover') {
      fetchData('discover', 'id');
    } else if (pathname === '/page') {
      fetchData('articles', 'id');
    } else if (pathname === '/search') {
      const query = searchParams.get('query');
      console.log(`Search executed for query: "${query}"`);
    }
  }, [pathname, searchParams]);

  return (
    <html lang="en">
      <body>
        <nav
          className="bg-primary sticky top-0 w-full z-[100]"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo and Brand Name */}
            <a
              href="index.html"
              className="mr-4 block cursor-pointer py-1.5 text-base text-white font-semibold flex gap-3 place-items-center"
              aria-label="Go to homepage"
            >
              <Image src="logo.png" alt="HMRC logo" width="30" height="30" />
              Leadership & Management Capability Academy
            </a>

            {/* Desktop Search Form */}
            <div className="items-center hidden gap-x-2 lg:flex">
              <form
                className="w-full flex gap-3"
                action="search.html"
                aria-label="Search form"
              >
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
                  aria-describedby="search-description"
                />
                <Button type="submit" variant="white">
                  Search
                </Button>
              </form>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="relative align-middle lg:hidden text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-expanded={isSearchOpen}
              aria-controls="mobile-search-form"
              aria-label={isSearchOpen ? "Close search form" : "Open search form"}
            >
              <Menu />
            </button>
          </div>
        </nav>

        {/* Mobile Search Form */}
        {isSearchOpen && (
          <div
            id="mobile-search-form"
            className="lg:hidden bg-white p-4 sticky top-[90px] z-[100]"
          >
            <form
              className="w-full flex gap-3"
              action="search.html"
              aria-label="Mobile search form"
            >
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
                aria-describedby="mobile-search-description"
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        )}

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}