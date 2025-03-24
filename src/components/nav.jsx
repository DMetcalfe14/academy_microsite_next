"use client";

import { useState, useEffect, Suspense } from "react";
import { Menu, ArrowLeft } from "iconoir-react";
import Button from "@/components/button";
import Image from "next/image";
import { useJsonData } from "@/context/json_context";
import useScorm from "@/hooks/useSCORM";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data } = useJsonData() || {};
  const { courses = [], articles = [], discover = [] } = data || {};
  const { setLocation } = useScorm();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const id = searchParams.get("id");
    let item;
    let msg;
    if (pathname.includes("/details")) {
      item = courses.find((item) => item.id == id);
      if (item) {
        msg = `Viewed the course details for "${item.title}"`;
        console.log(msg);
        setLocation(msg);
      }
    } else if (pathname.includes("/discover")) {
      item = discover.find((item) => item.id == id);
      if (item) {
        msg = `Exploring the material within "${item.title}"`;
        console.log(msg);
        setLocation(msg);
      }
    } else if (pathname.includes("/page")) {
      item = articles.find((item) => item.id == id);
      if (item) {
        msg = `Navigated to page: "${item.title}"`;
        console.log(msg);
        setLocation(msg);
      }
    } else if (pathname.includes("/index")) {
      msg = `Navigated to home`;
      console.log(msg);
      setLocation(msg);
    }
  }, [data, pathname, searchParams]);

  useEffect(() => {
    if (selectedIndex !== null) {
      const input = document.getElementById("search");
      input.setAttribute(
        "aria-activedescendant",
        `suggestion-${selectedIndex}`
      );
    }
  }, [selectedIndex]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredSuggestions = courses
        .filter((course) =>
          course.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
    setSelectedIndex(null);
  };

  const handleSuggestionClick = (course) => {
    submitForm(course.title);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev === null ? 0 : Math.min(prev + 1, suggestions.length - 1)
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev === null ? suggestions.length - 1 : Math.max(prev - 1, 0)
        );
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIndex !== null && suggestions[selectedIndex]) {
          submitForm(suggestions[selectedIndex].title);
        }
        break;
      case "Escape":
        setSuggestions([]);
        setSelectedIndex(null);
        break;
      default:
        break;
    }
  };

  const submitForm = (query) => {
    setSearchQuery(query);
    setSuggestions([]);
    setSelectedIndex(null);

    setTimeout(() => {
      const form = document.getElementById("search-form");
      if (form) form.submit();
    }, 200);
  };

  const showOnPaths = ["/details.html", "/discover.html", "/page.html"];

  useEffect(() => {
    const fullPath = `${pathname}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    router.push(fullPath);
  }, [pathname]);

  const handleBackClick = () => {
    if (history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <nav
        className="bg-primary sticky top-0 w-full z-[100]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Main Header Container */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0">
              <a
                href="index.html"
                className="cursor-pointer text-white font-semibold flex items-center gap-3"
                aria-label="Go to homepage"
              >
                <Image src="logo.png" alt="HMRC logo" width="30" height="30" />
                <span className="whitespace-nowrap text-sm sm:text-base">
                  Leadership & Management Capability Academy
                </span>
              </a>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-xl ml-8">
              <form
                id="search-form"
                className="w-full flex gap-3 relative"
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
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-md bg-white px-3.5 py-2 text-sm placeholder:text-gray-500 focus:outline-primary"
                  placeholder="Search for articles, learning and more..."
                  role="combobox"
                  aria-controls="suggestions-list"
                  aria-expanded={suggestions.length > 0}
                  aria-autocomplete="list"
                  aria-haspopup="listbox"
                />

                {suggestions.length > 0 && (
                  <div
                    id="suggestions-list"
                    className="absolute top-full left-0 right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-[200]"
                    role="listbox"
                    aria-label="Search suggestions"
                  >
                    {suggestions.map((course, index) => (
                      <div
                        key={index}
                        id={`suggestion-${index}`}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          selectedIndex === index ? "bg-gray-100" : ""
                        }`}
                        role="option"
                        aria-selected={selectedIndex === index}
                        onClick={() => handleSuggestionClick(course)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSuggestionClick(course)
                        }
                        tabIndex={0}
                      >
                        {course.title}
                      </div>
                    ))}
                  </div>
                )}
                <Button type="submit" variant="white" className="flex-shrink-0">
                  Search
                </Button>
              </form>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                className="text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-expanded={isSearchOpen}
                aria-controls="mobile-search"
                aria-label={isSearchOpen ? "Close search" : "Open search"}
              >
                <Menu />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="lg:hidden mt-4">
              <form
                id="mobile-search"
                className="w-full flex gap-3 relative"
                action="search.html"
                aria-label="Mobile search"
              >
                <input
                  id="mobile-search-input"
                  name="query"
                  type="text"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-md bg-white px-3.5 py-2 text-sm placeholder:text-gray-500 focus:outline-primary"
                  placeholder="Search for articles..."
                  role="combobox"
                  aria-controls="mobile-suggestions"
                  aria-expanded={suggestions.length > 0}
                />
                <Button type="submit" variant="white" className="flex-shrink-0">
                  Search
                </Button>

                {suggestions.length > 0 && (
                  <div
                    id="mobile-suggestions"
                    className="absolute top-full left-0 right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-[200]"
                    role="listbox"
                  >
                    {suggestions.map((course, index) => (
                      <div
                        key={index}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          selectedIndex === index ? "bg-gray-100" : ""
                        }`}
                        role="option"
                        onClick={() => handleSuggestionClick(course)}
                      >
                        {course.title}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </nav>
      {showOnPaths.some(path => pathname.includes(path)) && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <button
            onClick={handleBackClick}
            className="absolute z-50 mt-4 inline-flex items-center border border-transparent text-sm font-medium text-white"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
            Back
          </button>
        </div>
      )}
    </>
  );
};

export default function Nav() {
  return (
    <Suspense>
      <Navigation />
    </Suspense>
  );
}
