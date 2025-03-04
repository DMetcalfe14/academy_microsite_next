"use client";

import { useState, useEffect, Suspense } from "react";
import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";

import CardSection from "../../components/cards_section";
import Checkbox from "../../components/checkbox";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

function Search() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [searchInput, setSearchInput] = useState(""); // Local state for search input
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced query state
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    // Use SWR to fetch courses data
    const { data: courses = [], isLoading } = useSWR("courses.json", fetcher, {
        suspense: true,
        revalidateOnFocus: true,
        fallbackData: [],
        keepPreviousData: true,
    });

    // Extract unique categories and types dynamically from courses
    const categories = [...new Set(courses.flatMap((course) => course.categories || []))];
    const types = [...new Set(courses.map((course) => course.type))];

    // Initialize selected categories and types based on URL query parameters (only once)
    useEffect(() => {
        if (category) {
            setSelectedCategories(category.split(","));
        }
        if (type) {
            setSelectedTypes(type.split(","));
        }
        setSearchInput(query); // Initialize the search input with the query from URL
        setDebouncedQuery(query); // Ensure debouncedQuery is also initialized
    }, [category, type, query]);

    // Handle category selection/deselection
    const handleCategoryChange = (category) => {
        let updatedCategories;
        if (selectedCategories.includes(category)) {
            updatedCategories = selectedCategories.filter((c) => c !== category);
        } else {
            updatedCategories = [...selectedCategories, category];
        }
        setSelectedCategories(updatedCategories);

        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (updatedCategories.length > 0) {
            newSearchParams.set("category", updatedCategories.join(","));
        } else {
            newSearchParams.delete("category");
        }
        router.push(`?${newSearchParams.toString()}`);
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

        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (updatedTypes.length > 0) {
            newSearchParams.set("type", updatedTypes.join(","));
        } else {
            newSearchParams.delete("type");
        }
        router.push(`?${newSearchParams.toString()}`);
    };

    // Debouncing logic for the search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchInput); // Update debounced query after delay
            const newSearchParams = new URLSearchParams(searchParams.toString());
            if (searchInput) {
                newSearchParams.set("query", searchInput);
            } else {
                newSearchParams.delete("query");
            }
            router.push(`?${newSearchParams.toString()}`);
        }, 1000); // 300ms debounce delay

        return () => clearTimeout(handler); // Cleanup timeout on unmount or input change
    }, [searchInput]);

    // Filter courses based on the current filters
    const filteredCourses = courses.filter((course) => {
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

    return (
        <section className="mb-15">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

export default function SearchPage() {
    return (
        <Suspense>
            <Search />
        </Suspense>
    );
}
