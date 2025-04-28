"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useJsonData } from "@/context/json_context";

import { Filter, NavArrowUp, NavArrowDown } from "iconoir-react";

import CardSection from "../../components/cards_section";
import Checkbox from "../../components/checkbox";
import CheckboxSkeleton from "../../components/checkbox_skeleton";

function Search() {
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedProgrammes, setSelectedProgrammes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    types: true,
    programmes: true,
    locations: true,
    durations: true,
  });

  const { data, isLoading } = useJsonData();
  const { courses = [] } = data;

  const categories = [
    ...new Set([...(courses.flatMap((course) => course.categories) || [])]),
  ];
  const types = [...new Set(courses.map((course) => course.type))];
  const programmes = [
    ...new Set([...(courses.flatMap((course) => course.programmes) || [])]),
  ];
  const locations = [
    ...new Set(
      courses
        .filter((course) => course.type === "Event")
        .flatMap((course) =>
          course.events ? course.events.map((event) => event.location) : []
        )
    ),
  ];

  const durations = [
    { label: "0 - 15 mins", min: 0, max: 15 },
    { label: "15 - 30 mins", min: 15, max: 30 },
    { label: "30 - 60 mins", min: 30, max: 60 },
    { label: "1hr - 2hrs", min: 60, max: 120 },
    { label: "Over 2hrs", min: 120, max: Infinity },
  ];

  useEffect(() => {
    window.parent.postMessage(
      {
        type: "PATH_CHANGE",
        path: "Search",
      },
      "*"
    );
  }, []);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const programme = searchParams.get("programme");
    const location = searchParams.get("location");
    const duration = searchParams.get("duration");

    if (category) setSelectedCategories(category.split(","));
    if (type) setSelectedTypes(type.split(","));
    if (programme) setSelectedProgrammes(programme.split(","));
    if (location) setSelectedLocation(location);
    if (duration) {
      // duration query param is comma-separated min values, reconstruct objects
      const minValues = duration.split(",").map(Number);
      const selected = durations.filter((d) => minValues.includes(d.min));
      setSelectedDurations(selected);
    }
    setSearchInput(query);
    setDebouncedQuery(query);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchInput);
      resetPageCount();
      registerSearch(searchInput);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchInput]);

  const resetPageCount = () => {
    setPageCount(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    resetPageCount();
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    resetPageCount();
  };

  const handleProgrammeChange = (programme) => {
    setSelectedProgrammes((prev) =>
      prev.includes(programme)
        ? prev.filter((p) => p !== programme)
        : [...prev, programme]
    );
    resetPageCount();
  };

  const handleLocationChange = (location) => {
    setSelectedLocation((prevLocation) =>
      prevLocation === location ? "" : location
    );
    resetPageCount();
  };

  const handleDurationChange = (duration) => {
    setSelectedDurations((prev) => {
      const exists = prev.some(
        (d) => d.min === duration.min && d.max === duration.max
      );
      if (exists) {
        return prev.filter(
          (d) => !(d.min === duration.min && d.max === duration.max)
        );
      } else {
        return [...prev, duration];
      }
    });
    resetPageCount();
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Calculate min and max duration for filter
  const minDuration =
    selectedDurations.length > 0
      ? Math.min(...selectedDurations.map((d) => d.min))
      : undefined;
  const maxDuration =
    selectedDurations.length > 0
      ? Math.max(...selectedDurations.map((d) => d.max))
      : undefined;

  return (
    <main aria-label="Search results">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Filters Section */}
          <aside className="grid-cols-1" aria-labelledby="filters-heading">
            <h1 id="filters-heading" className="text-2xl font-semibold mb-4">
              Filters
            </h1>

            {/* Categories Section */}
            <div className="mb-6" id="categories">
              <button
                onClick={() => toggleSection("categories")}
                className="flex items-center justify-between w-full text-md font-semibold mb-2"
              >
                Categories
                {expandedSections.categories ? (
                  <NavArrowUp />
                ) : (
                  <NavArrowDown />
                )}
              </button>
              {expandedSections.categories &&
                (isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <CheckboxSkeleton key={index} />
                    ))
                  : categories
                      .sort()
                      .map((category) => (
                        <Checkbox
                          key={category}
                          label={category}
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                      )))}
            </div>

            {/* Types Section */}
            <div className="mb-6" id="types">
              <button
                onClick={() => toggleSection("types")}
                className="flex items-center justify-between w-full text-md font-semibold mb-2"
              >
                Types
                {expandedSections.types ? <NavArrowUp /> : <NavArrowDown />}
              </button>
              {expandedSections.types &&
                (isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <CheckboxSkeleton key={index} />
                    ))
                  : types
                      .sort()
                      .map((type) => (
                        <Checkbox
                          key={type}
                          label={type}
                          checked={selectedTypes.includes(type)}
                          onChange={() => handleTypeChange(type)}
                        />
                      )))}
            </div>

            {/* Durations Section */}
            <div className="mb-6" id="durations">
              <button
                onClick={() => toggleSection("durations")}
                className="flex items-center justify-between w-full text-md font-semibold mb-2"
              >
                Durations
                {expandedSections.durations ? <NavArrowUp /> : <NavArrowDown />}
              </button>
              {expandedSections.durations &&
                (isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <CheckboxSkeleton key={index} />
                    ))
                  : durations.map((duration) => (
                      <Checkbox
                        key={duration.label}
                        label={duration.label}
                        checked={selectedDurations.some(
                          (selected) =>
                            selected.min === duration.min &&
                            selected.max === duration.max
                        )}
                        onChange={() => handleDurationChange(duration)}
                      />
                    )))}
            </div>

            {/* Programmes Section */}
            <div className="mb-6" id="programmes">
              <button
                onClick={() => toggleSection("programmes")}
                className="flex items-center justify-between w-full text-md font-semibold mb-2"
              >
                Programmes
                {expandedSections.programmes ? (
                  <NavArrowUp />
                ) : (
                  <NavArrowDown />
                )}
              </button>
              {expandedSections.programmes &&
                (isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <CheckboxSkeleton key={index} />
                    ))
                  : programmes
                      .filter((programme) => programme)
                      .sort()
                      .map((programme) => (
                        <Checkbox
                          key={programme}
                          label={programme}
                          checked={selectedProgrammes.includes(programme)}
                          onChange={() => handleProgrammeChange(programme)}
                        />
                      )))}
            </div>

            {/* Locations Section */}
            {locations.length > 0 && (
              <div className="mb-6" id="locations">
                <button
                  onClick={() => toggleSection("locations")}
                  className="flex items-center justify-between w-full text-md font-semibold mb-2"
                >
                  Locations
                  {expandedSections.locations ? (
                    <NavArrowUp />
                  ) : (
                    <NavArrowDown />
                  )}
                </button>
                {expandedSections.locations &&
                  (isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <CheckboxSkeleton key={index} />
                      ))
                    : locations
                        .sort()
                        .map((location) => (
                          <Checkbox
                            key={location}
                            label={location}
                            checked={selectedLocation === location}
                            onChange={() => handleLocationChange(location)}
                          />
                        )))}
              </div>
            )}
          </aside>

          {/* Pass filters directly to CardSection */}
          <section className="col-span-3" aria-labelledby="results-heading">
            <h2 id="results-heading" className="sr-only">
              Search Results
            </h2>
            {/* Search Bar */}
            <div className="mb-6">
              <label htmlFor="search-bar" className="sr-only">
                Search
              </label>
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
                byProgramme: selectedProgrammes,
                ...(selectedDurations.length > 0 && {
                  byMinDuration: minDuration,
                  byMaxDuration: maxDuration,
                }),
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

function registerSearch(query) {
  if (query !== "") {
    window.parent.postMessage(
      {
        type: "SEARCHED_FOR",
        query: query,
      },
      "*"
    );
  }
}
