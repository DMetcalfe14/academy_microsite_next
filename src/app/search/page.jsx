"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useJsonData } from '@/context/json_context';

import { Filter, NavArrowUp, NavArrowDown } from 'iconoir-react';

import CardSection from "../../components/cards_section";
import Checkbox from "../../components/checkbox";
import CheckboxSkeleton from "../../components/checkbox_skeleton";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    types: true,
    locations: true
  });

  const { data, isLoading } = useJsonData();
  const { courses = [] } = data;

  const categories = [...new Set([...courses.flatMap((course) => course.categories) || []])];
  const types = [...new Set(courses.map((course) => course.type))];
  const locations = [...new Set(courses.filter((course) => course.type === "Event").flatMap((course) => course.events ? course.events.map((event) => event.location) : []))];
  
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchInput);
      if (searchInput != "") {
        let msg = `Searching with query: ${searchInput}`;
        setLocation(msg);
      }
      updateURL();
      resetPageCount();
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    updateURL();
  }, [selectedCategories, selectedTypes, selectedLocation]);

  const resetPageCount = () => {
    setPageCount(1);
  };

  const updateURL = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchInput) params.set("query", searchInput);
    else params.delete("query");
    
    if (selectedCategories.length) params.set("category", selectedCategories.join(","));
    else params.delete("category");
    
    if (selectedTypes.length) params.set("type", selectedTypes.join(","));
    else params.delete("type");
    
    if (selectedLocation) params.set("location", selectedLocation);
    else params.delete("location");
  
    const newURL = `${pathname}?${params.toString()}`;
    window.history.pushState(null, '', newURL);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    resetPageCount();
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    resetPageCount();
  };

  const handleLocationChange = (location) => {
    setSelectedLocation((prevLocation) => prevLocation === location ? "" : location);
    resetPageCount();
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({...prev, [section]: !prev[section]}));
  };

  return (
    <main aria-label="Search results">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Filters Section */}
          <aside className="grid-cols-1" aria-labelledby="filters-heading">
            <h1 id="filters-heading" className="text-2xl font-semibold mb-4">Filters</h1>
            
            {/* Categories Section */}
            <div className="mb-6">
              <button 
                onClick={() => toggleSection('categories')} 
                className="flex items-center justify-between w-full text-md font-semibold mb-2"
              >
                Categories
                {expandedSections.categories ? <NavArrowUp /> : <NavArrowDown />}
              </button>
              {expandedSections.categories && (
                isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <CheckboxSkeleton key={index} />
                  ))
                ) : (
                  categories.map((category) => (
                    <Checkbox
                      key={category}
                      label={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                  ))
                )
              )}
            </div>

{/* Types Section */}
                  <div className="mb-6" id="types">
                    <button 
                    onClick={() => toggleSection('types')} 
                    className="flex items-center justify-between w-full text-md font-semibold mb-2"
                    >
                    Types
                    {expandedSections.types ? <NavArrowUp /> : <NavArrowDown />}
                    </button>
                    {expandedSections.types && (
                    isLoading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                      <CheckboxSkeleton key={index} />
                      ))
                    ) : (
                      types.map((type) => (
                      <Checkbox
                        key={type}
                        label={type}
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                      />
                      ))
                    )
                    )}
                  </div>

                  {/* Locations Section */}
                  {locations.length > 0 && (
                    <div className="mb-6" id="locations">
                    <button 
                      onClick={() => toggleSection('locations')} 
                      className="flex items-center justify-between w-full text-md font-semibold mb-2"
                    >
                      Locations
                      {expandedSections.locations ? <NavArrowUp /> : <NavArrowDown />}
                    </button>
                    {expandedSections.locations && (
                      isLoading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <CheckboxSkeleton key={index} />
                      ))
                      ) : (
                      locations.map((location) => (
                        <Checkbox
                        key={location}
                        label={location}
                        checked={selectedLocation === location}
                        onChange={() => handleLocationChange(location)}
                        />
                      ))
                      )
                    )}
                    </div>
                  )}
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
              pageCount={pageCount}
              onPageChange={(newPage) => setPageCount(newPage)}
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