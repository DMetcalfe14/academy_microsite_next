"use client";

import { useState, useEffect, Suspense } from "react";
import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";

import CardSection from "../../components/cards_section";
import Checkbox from "../../components/checkbox";
import CheckboxSkeleton from "../../components/checkbox_skeleton";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Local state for filters and search input
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Use SWR to fetch courses data
  const { data: courses = [], isLoading } = useSWR("courses.json", fetcher, {
    revalidateOnFocus: true,
    fallbackData: [],
    keepPreviousData: true,
  });

  // Extract unique categories, types, and locations dynamically from courses
  const categories = [...new Set(courses.flatMap((course) => course.categories || []))];
  const types = [...new Set(courses.map((course) => course.type))];
  const locations = [
    ...new Set(
      courses
        .filter((course) => course.type === "Event")
        .flatMap((course) => course.events.map((event) => event.location))
    ),
  ];

  // Initialize state from URL query parameters on page load
  useEffect(() => {
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const location = searchParams.get("location");

    if (category) setSelectedCategories(category.split(","));
    if (type) setSelectedTypes(type.split(","));
    if (location) setSelectedLocation(location);
    setSearchInput(query);
    setDebouncedQuery(query);
  }, []);

  // Debouncing logic for the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

  // Function to update the URL query string explicitly (on user action)
  const updateUrlQueryString = () => {
    const newSearchParams = new URLSearchParams();

    if (debouncedQuery) newSearchParams.set("query", debouncedQuery);
    if (selectedCategories.length > 0)
      newSearchParams.set("category", selectedCategories.join(","));
    if (selectedTypes.length > 0)
      newSearchParams.set("type", selectedTypes.join(","));
    if (selectedLocation) newSearchParams.set("location", selectedLocation);

    router.replace(`?${newSearchParams.toString()}`); // Use replace to avoid full re-render
  };

  return (
    <main aria-label="Search results">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Filters Section */}
          <aside className="grid-cols-1" aria-labelledby="filters-heading">
            <h1 id="filters-heading" className="text-2xl font-semibold mb-4">Filters</h1>
            <div className="mb-6">
              <p className="text-md font-semibold mb-2">Categories</p>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <CheckboxSkeleton key={index} />
                ))
              ) : (
                categories.map((category) => (
                  <Checkbox
                    key={category}
                    label={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(category)
                          ? prev.filter((c) => c !== category)
                          : [...prev, category]
                      )
                    }
                  />
                ))
              )}
            </div>
            <div className="mb-6" id="types">
              <p className="text-md font-semibold mb-2">Types</p>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <CheckboxSkeleton key={index} />
                ))
              ) : (
                types.map((type) => (
                  <Checkbox
                    key={type}
                    label={type}
                    checked={selectedTypes.includes(type)}
                    onChange={() =>
                      setSelectedTypes((prev) =>
                        prev.includes(type)
                          ? prev.filter((t) => t !== type)
                          : [...prev, type]
                      )
                    }
                  />
                ))
              )}
            </div>
            {/* Location Filter */}
            <div className="mb-6" id="locations">
              <p className="text-md font-semibold mb-2">Locations</p>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <CheckboxSkeleton key={index} />
                ))
              ) : (
                locations.map((location) => (
                  <Checkbox
                    key={location}
                    label={location}
                    checked={selectedLocation === location}
                    onChange={() =>
                      setSelectedLocation((prevLocation) =>
                        prevLocation === location ? "" : location
                      )
                    }
                  />
                ))
              )}
            </div>
          </aside>

          {/* Pass filters directly to CardSection */}
          <section className="col-span-3" aria-labelledby="results-heading">
            <h2 id="results-heading" className="sr-only">Search Results</h2>
            {/* Search Bar */}
            <div className="mb-6">
              <label htmlFor="search-bar" className="sr-only">Search</label>
              <input
                id="search-bar"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for articles, learning and more..."
                className="border border-gray-300 px-4 py-2 w-full rounded"
              />
            </div>

            {/* Card Section */}
            <CardSection
              cards={courses}
              filters={{
                byQuery: debouncedQuery,
                byCategory: selectedCategories,
                byType: selectedTypes,
                byLocation: selectedLocation,
              }}
              paginated={true}
              perRow={3}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default function SearchSuspense() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
