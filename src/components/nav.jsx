"use client";

import { useState, useEffect, Suspense } from "react";
import { Menu, ArrowLeft, Search, NavArrowDown } from "iconoir-react";
import Button from "@/components/button";
import Image from "next/image";
import { useJsonData } from "@/context/json_context";
import { useTour } from "@/context/tour_context";
import { useSiteHistory } from "@/context/history_context";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { canGoBack, goBack } = useSiteHistory();
  const { startTour, hasTour } = useTour();

  const { data } = useJsonData() || {};
  const { courses = [], categories = [] } = data || {};

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    router.push(`details.html?id=${course.id}`);
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

  const handleBackClick = () => {
    goBack();
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
          <div className="flex items-center justify-between w-full">
            {/* Left: Back Button, Logo, Title */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {canGoBack && (
                <button
                  onClick={handleBackClick}
                  aria-label="Go back"
                  className="text-black hover:text-primary-dark focus:outline-none hidden sm:block"
                  type="button"
                >
                  <ArrowLeft />
                </button>
              )}
              <a
                href="index.html"
                className="cursor-pointer text-label font-semibold flex items-center gap-3"
                aria-label="Go to homepage"
              >
                <Image src="logo.png" alt="HMRC logo" width="30" height="30" />
                <span className="whitespace-nowrap text-sm text-black">
                  Leadership & Management Capability Academy
                </span>
              </a>
            </div>

            {/* Right: Nav Items and Search/Menu */}
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-6">
                <a href="search.html" className="text-black text-sm">
                  View Catalogue
                </a>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-black text-sm flex items-center gap-1"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                  >
                    Explore Capability Learning
                    <NavArrowDown
                      className={`transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isDropdownOpen && !isSearchOpen && (
                    <div
                      className="absolute mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-full"
                      role="menu"
                    >
                      {categories.map((category) => (
                        <a
                          key={category.title}
                          href={
                            category.href
                              ? category.href
                              : `search.html?category=${category.title}`
                          }
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          tabIndex={0}
                        >
                          {category.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                {hasTour && (
                  <button
                    onClick={() => startTour()}
                    className="text-sm text-black"
                    aria-label="Start user tour"
                    title="Start user tour"
                  >
                    Start Tour
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4">
                {/* Search Icon */}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-black"
                  aria-label="Toggle search"
                >
                  <Search />
                </button>

                {/* Mobile Toggle */}
                <button
                  className="lg:hidden text-black"
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  <Menu />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div id="mobile-menu" className="lg:hidden mt-4">
              <a
                href="/search.html"
                className="block px-4 py-2 text-sm text-black"
              >
                View Catalogue
              </a>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="block w-full text-left px-4 py-2 text-sm text-black flex items-center justify-between"
                >
                  Explore Capability Learning
                  <NavArrowDown
                    className={`transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="mt-2 pl-4 w-full">
                    {categories.map((category) => (
                      <a
                        key={category.title}
                        href={
                          category.href
                            ? category.href
                            : `/search.html?category=${category.title}`
                        }
                        className="block px-4 py-2 text-sm text-black"
                      >
                        {category.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {hasTour && (
                <button
                  onClick={() => startTour()}
                  className="block px-4 py-2 text-sm text-black"
                  aria-label="Start user tour"
                  title="Start user tour"
                >
                  Start Tour
                </button>
              )}
            </div>
          )}
          {isSearchOpen && (
            <div className="mt-4">
              <form
                id="search-form"
                className="w-full flex gap-3 relative"
                action="search.html"
                aria-label="Search form"
              >
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
                <Button type="submit" variant="white" className="flex-shrink-0">
                  Search
                </Button>
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
                        tabIndex={0}
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
