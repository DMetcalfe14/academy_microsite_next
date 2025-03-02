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
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    // Use SWR to fetch courses data
    const { data: courses = [], error } = useSWR("/courses.json", fetcher);

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
    }, [category, type]);

    // Handle category selection/deselection
    const handleCategoryChange = (category) => {
        let updatedCategories;
        if (selectedCategories.includes(category)) {
            // Remove category if it is already selected
            updatedCategories = selectedCategories.filter((c) => c !== category);
        } else {
            // Add category if it is not already selected
            updatedCategories = [...selectedCategories, category];
        }
        setSelectedCategories(updatedCategories);

        // Update the URL search params
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

        // Update the URL search params
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (updatedTypes.length > 0) {
            newSearchParams.set("type", updatedTypes.join(","));
        } else {
            newSearchParams.delete("type");
        }
        router.push(`?${newSearchParams.toString()}`);
    };

    if (error) {
        return <div>Error loading courses...</div>;
    }

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
                                value={query}
                                onChange={(e) =>
                                    router.push(
                                        `?query=${e.target.value}&category=${selectedCategories.join(",")}&type=${selectedTypes.join(",")}`
                                    )
                                }
                                placeholder="Search courses..."
                                className="border border-gray-300 px-4 py-2 w-full rounded"
                            />
                        </div>
                        {/* Card Section */}
                        <CardSection
                            cards={courses}
                            paginated={true}
                            perRow={3}
                            filters={{
                                byQuery: query,
                                byCategory: selectedCategories,
                                byType: selectedTypes,
                            }}
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
