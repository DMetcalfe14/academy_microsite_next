"use client";

import { useState, useEffect } from "react";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import CardCarousel from "./card_carousel";
import Card from "@/components/card";
import CardSectionSkeleton from "./card_section_skeleton";

const filterRules = {
  topN: (courses, n) => (n ? courses?.slice(0, n) : courses),
  byId: (courses, ids) =>
    ids ? courses.filter((course) => ids.includes(course.id)) : courses,
  byCategory: (courses, categories) =>
    categories.length > 0
      ? courses.filter((course) =>
          categories.some((category) => course.categories.includes(category))
        )
      : courses,
  byMaxDuration: (courses, maxDuration) =>
    maxDuration
      ? courses.filter((course) => course.duration <= maxDuration)
      : courses,
  byMinDuration: (courses, minDuration) =>
    minDuration
      ? courses.filter((course) => course.duration >= minDuration)
      : courses,
  byType: (courses, types) =>
    types.length > 0
      ? courses.filter((course) =>
          types.some((type) => course.type.includes(type))
        )
      : courses,
  byLocation: (courses, location) =>
    location
      ? courses.filter((course) => {
          // If the course has events, check if any event matches the location
          if (course.type === "Event" && Array.isArray(course.events)) {
            return course.events.some((event) => event.location === location);
          }
          // For non-event courses, skip filtering by location
          return false;
        })
      : courses,
  byQuery: (courses, query) =>
    query
      ? courses.filter(
          (course) =>
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase())
        )
      : courses,
};

const CardSection = ({
  id,
  title,
  description,
  cards = [],
  filters,
  paginated,
  useCarousel = false,
  perRow = 4,
  perView = 4,
  onViewAll,
  pageCount = 1,
  onPageChange
}) => {
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const cardsPerPage = paginated ? 6 : cards?.length;

  // Calculate which cards to display based on the current page
  const indexOfLastCard = pageCount * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filtered?.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filtered?.length / cardsPerPage);

  // Apply filters and update filtered cards
  useEffect(() => {
    setIsLoading(true);
    if (filters) {
      const result = applyFilters(cards, filters);
      setFiltered(result);
    } else {
      setFiltered(cards);
    }
    setIsLoading(false);
  }, [cards, filters]);

  const applyFilters = (cards, rules) => {
    const skipCategory = !!rules.byId; // Check if ID filtering is active
  
    return Object.entries(rules).reduce((filtered, [ruleKey, ruleValue]) => {
      // Skip category filter when IDs are provided
      if (skipCategory && ruleKey === "byCategory") return filtered;
  
      const filterFunction = filterRules[ruleKey];
      return filterFunction ? filterFunction(filtered, ruleValue) : filtered;
    }, cards);
  };
  

  // Handle "Next" button click
  const handleNextPage = () => {
    if (pageCount < totalPages && onPageChange) {
      onPageChange(pageCount + 1); // Notify parent to increment page
    }
  };

  // Handle "Previous" button click
  const handlePrevPage = () => {
    if (pageCount > 1 && onPageChange) {
      onPageChange(pageCount - 1); // Notify parent to decrement page
    }
  };

  if (isLoading)
    return (
      <CardSectionSkeleton
        perRow={useCarousel ? perView : perRow}
        perPage={useCarousel ? perView : cardsPerPage}
        paginated={paginated}
        aria-label="Loading card section content"
      />
    );

  const html = (
    <>
      {title && (
        <h2
          id="card-section-title"
          className="text-2xl font-semibold mb-4 text-gray-800"
        >
          {title}
        </h2>
      )}
      {description && <p className="mb-6 text-gray-700">{description}</p>}
      {filtered?.length > 0 && paginated && !useCarousel && (
        <p className="text-sm mb-4 text-gray-600">
          <span>{filtered.length}</span> results
        </p>
      )}

      {useCarousel ? (
        <CardCarousel cards={currentCards} perView={perView} onViewAll={onViewAll} />
      ) : (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${perRow} gap-6`}
          aria-labelledby="card-section-title"
        >
          {currentCards?.map((card) => (
            <Card
              key={crypto.randomUUID()}
              id={card.id}
              title={card.title}
              description={card.description}
              duration={card.duration}
              thumbnail={card.thumbnail}
              type={card.type}
              categories={card.categories}
              page_href={card.page_href}
            />
          ))}
        </div>
      )}

      {/* Conditionally Render Pagination */}
      {!useCarousel && paginated && filtered.length > cardsPerPage && (
        <div className="flex items-center gap-8 place-content-between mt-8">
          <button
            id="prev"
            className="px-4 py-2 bg-primary text-label rounded font-semibold disabled:bg-gray-500 hover:bg-primary_hover focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            type="button"
            onClick={handlePrevPage}
            disabled={pageCount === 1}
            aria-label="Navigate to the previous page of results"
          >
            <NavArrowLeft />
          </button>
          <p>
            Page{" "}
            <span id="current_page" aria-live="polite">
              <strong>{pageCount}</strong>
            </span>{" "}
            of&nbsp;
            <span id="no_pages">
              <strong>{totalPages}</strong>
            </span>
          </p>
          <button
            id="next"
            className="px-4 py-2 bg-primary text-label rounded font-semibold disabled:bg-gray-500 hover:bg-primary_hover focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            type="button"
            onClick={handleNextPage}
            disabled={pageCount === totalPages}
            aria-label="Navigate to the next page of results"
          >
            <NavArrowRight />
          </button>
        </div>
      )}
    </>
  );

  return paginated ? (
    html
  ) : (
    <div
      id = {id}
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
      role="region"
      aria-labelledby="card-section-title"
    >
      {html}
    </div>
  );
};

export default CardSection;

