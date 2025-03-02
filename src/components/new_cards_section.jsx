"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavArrowLeft, NavArrowRight, ArrowRight } from "iconoir-react";
import Card from "./card";
import CardCarousel from "./card_carousel";

const filterRules = {
    topN: (courses, n) => (n ? courses.slice(0, n) : courses),
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

const CardSection = ({
  title,
  description,
  cards,
  filters,
  paginated,
  useCarousel = false,
  perRow = 4,
  more,
}) => {
  const [filtered, setFiltered] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = paginated ? 6 : cards.length;
  
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filtered.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(filtered.length / cardsPerPage);
  
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
  

  const gridVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  return (
    <>
      {title && <h1 className="text-2xl font-semibold mb-4">{title}</h1>}
      {description && <p className="mb-6">{description}</p>}
      {more && (
        <div className="flex">
          <button className="font-semibold hover:text-primary mb-6 flex">
            View all <ArrowRight />
          </button>
        </div>
      )}
      {filtered.length > 0 && paginated && !useCarousel && (
        <p className="text-sm mb-4">
          <span>{filtered.length}</span> results
        </p>
      )}
      
      {useCarousel ? (
        <CardCarousel cards={currentCards} perView={4} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${perRow} gap-6 mb-12`}
            aria-live="polite"
            aria-busy={currentPage !== totalPages}
          >
            {currentCards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  duration={card.duration}
                  thumbnail={card.thumbnail}
                  type={card.type}
                  categories={card.categories}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Pagination with animations */}
      {!useCarousel && totalPages > 1 && paginated && (
        <motion.div 
          className="flex items-center gap-8 place-content-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-8 place-content-between">
          <button
            id="prev"
            className="px-4 py-2 bg-primary text-white rounded font-semibold disabled:bg-gray-500 hover:bg-primary_hover"
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
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
          >
            <NavArrowRight />
          </button>
        </div>
        </motion.div>
      )}
    </>
  );
};

export default CardSection;