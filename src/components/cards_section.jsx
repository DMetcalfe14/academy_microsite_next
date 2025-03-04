"use client";

import { useState, useEffect } from "react";
import { NavArrowLeft, NavArrowRight, ArrowRight } from "iconoir-react";
import CardCarousel from "./card_carousel";
import Card from "@/components/card";

const filterRules = {
  topN: (courses, n) => (n ? courses?.slice(0, n) : courses),
  byCategory: (courses, categories) =>
    categories.length > 0
      ? courses.filter((course) =>
          categories.some((category) => course.categories.includes(category))
        )
      : courses,
  byMaxDuration: (courses, maxDuration) =>
    maxDuration ? courses.filter((course) => course.duration <= maxDuration) : courses,
  byMinDuration: (courses, minDuration) =>
    minDuration ? courses.filter((course) => course.duration >= minDuration) : courses,
  byType: (courses, types) =>
    types.length > 0
      ? courses.filter((course) =>
          types.some((type) => course.type.includes(type))
        )
      : courses,
  byLocation: (courses, location) =>
    location ? courses.filter((course) => course.location === location) : courses,
  byQuery: (courses, query) =>
    query
      ? courses.filter(
          (course) =>
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase())
        )
      : courses,
  byId: (courses, ids) => (ids ? courses.filter((course) => ids.includes(course.id)) : courses),
};

const CardSection = ({
  title,
  description,
  cards,
  filters,
  paginated,
  useCarousel = false,
  perRow = 4,
  onViewAll
}) => {
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = paginated ? 6 : cards?.length;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filtered?.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filtered?.length / cardsPerPage);

  useEffect(() => {
    if (filters) {
      const result = applyFilters(cards, filters);
      setFiltered(result);
    } else {
      setFiltered(cards);
    }
  }, [cards, filters]);

  const applyFilters = (cards, rules) => {
    return Object.entries(rules).reduce((filtered, [ruleKey, ruleValue]) => {
      const filterFunction = filterRules[ruleKey];
      return filterFunction ? filterFunction(filtered, ruleValue) : filtered;
    }, cards);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const html = (
    <>
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      {description && <p className="mb-6">{description}</p>}
      {filtered?.length > 0 && paginated && !useCarousel && (
        <p className="text-sm mb-4">
          <span>{filtered.length}</span> results
        </p>
      )}

      {useCarousel ? (
        <CardCarousel cards={currentCards} perView={4} onViewAll={onViewAll}/>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${perRow} gap-6`}>
          {currentCards?.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              duration={card.duration}
              thumbnail={card.thumbnail}
              type={card.type}
              categories={card.categories}
            />
          ))}
        </div>
      )}

      {!useCarousel && totalPages > 1 && paginated && (
        <div className="flex items-center gap-8 place-content-between mt-8">
          <button
            id="prev"
            className="px-4 py-2 bg-primary text-white rounded font-semibold disabled:bg-gray-500 hover:bg-primary_hover"
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label="Navigate to the previous page of results"
          >
            <NavArrowLeft />
          </button>
          <p>
            Page{" "}
            <span id="current_page">
              <strong>{currentPage}</strong>
            </span>{" "}
            of&nbsp;
            <span id="no_pages">
              <strong>{totalPages}</strong>
            </span>
          </p>
          <button
            id="next"
            className="px-4 py-2 bg-primary text-white rounded font-semibold disabled:bg-gray-500 hover:bg-primary_hover"
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Navigate to the previous page of results"
          >
            <NavArrowRight />
          </button>
        </div>
      )}
    </>
  );

  return paginated ? html : <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{html}</div>
};

export default CardSection;
