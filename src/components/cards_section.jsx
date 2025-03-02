"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { NavArrowLeft, NavArrowRight, ArrowRight } from "iconoir-react";
import Card from "./card";
import CardCarousel from "./card_carousel";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const filterRules = {
  topN: (courses, n) => (n ? courses.slice(0, n) : courses),
  byCategory: (courses, categories) =>
    categories?.length > 0
      ? courses.filter((course) =>
        categories.some((category) => course.categories.includes(category))
      )
      : courses,
  byMaxDuration: (courses, maxDuration) =>
    maxDuration ? courses.filter((course) => course.duration <= maxDuration) : courses,
  byMinDuration: (courses, minDuration) =>
    minDuration ? courses.filter((course) => course.duration >= minDuration) : courses,
  byType: (courses, types) =>
    types?.length > 0
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
};

import LoadingSpinner from "./loading_spinner";

const CardSection = ({
  title,
  description,
  filters,
  paginated,
  useCarousel = false,
  perRow = 4,
  more,
}) => {
  const { data, error, isLoading, isValidating } = useSWR("/courses.json", fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false
  });

  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = paginated ? 6 : data?.length || 0;
  
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filtered.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filtered.length / cardsPerPage);
  const shouldShowPagination = !useCarousel && totalPages > 1 && paginated;

  const applyFilters = (courses, rules) => {
    return Object.entries(rules).reduce((filtered, [ruleKey, ruleValue]) => {
      const filterFunction = filterRules[ruleKey];
      return filterFunction ? filterFunction(filtered, ruleValue) : filtered;
    }, courses);
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

  useEffect(() => {
    if (data && filters) {
      const result = applyFilters(data, filters);
      setFiltered(result);
    } else if (data) {
      setFiltered(data);
    }
  }, [data, filters]);

  return (
    <div 
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mb-8 min-h-[300px]"
      role="region"
      aria-labelledby={title ? "card-section-title" : undefined}
      aria-live="polite"
      aria-busy={isLoading || isValidating}
    >
      {title && (
        <h1 
          id="card-section-title"
          className="text-2xl font-semibold mb-4"
        >
          {title}
        </h1>
      )}
      
      {description && (
        <p className="mb-6" aria-describedby="card-section-title">
          {description}
        </p>
      )}

      {error && (
        <div 
          role="alert"
          className="text-red-600"
          aria-live="assertive"
        >
          Error loading content. Please try again later.
        </div>
      )}

      {isLoading || isValidating ? (
        <div className="flex justify-center items-center min-h-[407px]">
          <LoadingSpinner />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {useCarousel ? (
            <CardCarousel 
              cards={currentCards}
              perView={perRow}
              aria-live="polite"
              className="mb-12"
            />
          ) : (
            <motion.div
              key={currentPage}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${perRow} gap-6 mb-12 items-stretch`}
              role="list"
            >
              {currentCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  transition={{ delay: index * 0.05 }}
                  layout
                  role="listitem"
                  aria-labelledby={`card-${card.id}-title`}
                  className="flex flex-col h-full focus:ring-2 focus:ring-primary focus:outline-none"
                  tabIndex="0"
                >
                  <Card
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    duration={card.duration}
                    thumbnail={card.thumbnail}
                    type={card.type}
                    categories={card.categories}
                    aria-labelledby={`card-${card.id}-title`}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {shouldShowPagination && (
        <motion.div 
          className="flex items-center gap-8 place-content-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            aria-label="Previous page"
            className="px-4 py-2 bg-primary text-white rounded font-semibold disabled:bg-gray-500 hover:bg-primary_hover focus:ring-2 focus:ring-primary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <NavArrowLeft aria-hidden="true" />
          </button>

          <p id="pagination-status" aria-live="polite">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </p>

          <button
            aria-label="Next page"
            className="px-4 py-2 bg-primary text-white rounded font-semibold disabled:bg-gray-500 hover:bg-primary_hover focus:ring-2 focus:ring-primary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <NavArrowRight aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CardSection;
