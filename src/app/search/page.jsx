"use client";

import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";

import CardSection from "../../components/cards_section";
import Checkbox from "../../components/checkbox";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

function Search() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Local state for filters and search input
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [searchInput, setSearchInput] = useState(""); // Local state for search input
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced query state

    // Use SWR to fetch courses data
    const { data: courses = [], isLoading } = useSWR("courses.json", fetcher, {
        revalidateOnFocus: true,
        fallbackData: [],
        keepPreviousData: true,
    });

    // Extract unique categories and types dynamically from courses
    const categories = [...new Set(courses.flatMap((course) => course.categories || []))];
    const types = [...new Set(courses.map((course) => course.type))];

    // Initialize state from URL query parameters on page load
    useEffect(() => {
        const query = searchParams.get("query") || "";
        const category = searchParams.get("category");
        const type = searchParams.get("type");

        if (category) {
            setSelectedCategories(category.split(","));
        }
        if (type) {
            setSelectedTypes(type.split(","));
        }
        setSearchInput(query); // Initialize the search input with the query from URL
        setDebouncedQuery(query); // Ensure debouncedQuery is also initialized
    }, []);

    // Handle category selection/deselection
    const handleCategoryChange = (category) => {
        let updatedCategories;
        if (selectedCategories.includes(category)) {
            updatedCategories = selectedCategories.filter((c) => c !== category);
        } else {
            updatedCategories = [...selectedCategories, category];
        }
        setSelectedCategories(updatedCategories);
    };

    // Handle type selection/deselection
    const handleTypeChange = (type) => {
        let updatedTypes;
        if (selectedTypes.includes(type)) {
            updatedTypes = selectedTypes.filter((t) => t !== type);
        } else {
            updatedTypes = [...selectedTypes, type];
        }
        setSelectedTypes(updatedTypes);
    };

    // Debouncing logic for the search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchInput); // Update debounced query after delay
        }, 500); // 500ms debounce delay

        return () => clearTimeout(handler); // Cleanup timeout on unmount or input change
    }, [searchInput]);

    // Update URL only when filters or search input changes (explicit submission)
    const updateUrlQueryString = () => {
        const newSearchParams = new URLSearchParams();

        if (debouncedQuery) newSearchParams.set("query", debouncedQuery);
        if (selectedCategories.length > 0)
            newSearchParams.set("category", selectedCategories.join(","));
        if (selectedTypes.length > 0)
            newSearchParams.set("type", selectedTypes.join(","));

        router.replace(`?${newSearchParams.toString()}`); // Use replace to avoid full re-render
    };

    // Memoize filtered courses to avoid unnecessary recalculations
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const matchesQuery = debouncedQuery
                ? course.title.toLowerCase().includes(debouncedQuery.toLowerCase())
                : true;
            const matchesCategory =
                selectedCategories.length > 0
                    ? selectedCategories.some((cat) => course.categories.includes(cat))
                    : true;
            const matchesType =
                selectedTypes.length > 0 ? selectedTypes.includes(course.type) : true;

            return matchesQuery && matchesCategory && matchesType;
        });
    }, [courses, debouncedQuery, selectedCategories, selectedTypes]);

    if (isLoading) {
        return <p>Loading...</p>; // Explicit loading state
    }

    return (
        <section className="mb-15">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Filters Section */}
                    <div className="grid-cols-1">
                        <h1 className="text-2xl font-semibold mb-4">Filters</h1>
                        <div className="mb-6">
                            <p className="text-md font-semibold mb-2">Categories</p>
                            {categories.map((category) => (
                                <Checkbox
                                    key={category}
                                    label={category}
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                            ))}
                        </div>
                        <div className="mb-6" id="types">
                            <p className="text-md font-semibold mb-2">Types</p>
                            {types.map((type) => (
                                <Checkbox
                                    key={type}
                                    label={type}
                                    checked={selectedTypes.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Search and Results Section */}
                    <div className="col-span-3">
                        {/* Search Bar */}
                        <div className="mb-6">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)} // Update local state directly
                                placeholder="Search for articles, learning and more..."
                                className="border border-gray-300 px-4 py-2 w-full rounded"
                            />
                        </div>

                        {/* Card Section */}
                        <CardSection
                            cards={filteredCourses} // Pass filtered courses here
                            paginated={true}
                            perRow={3}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Search;
