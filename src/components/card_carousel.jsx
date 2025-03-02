import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import Card from "./card";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const carouselVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const CardCarousel = ({ category, ids, perView }) => {
  const { data: cards, error, isLoading } = useSWR('/courses.json', fetcher);
  const carouselRef = useRef(null);

  const filteredCards = cards?.filter((card) => {
    const matchesCategory = category ? card.categories.includes(category) : true;
    const matchesId = ids ? ids.includes(card.id) : true;
    return matchesCategory && matchesId;
  }) || [];

  useEffect(() => {
    if (!isLoading && filteredCards.length > 0 && carouselRef.current) {
      const trackElement = carouselRef.current.querySelector('[data-glide-el="track"]');
      if (!trackElement) return;

      const glide = new Glide(carouselRef.current, {
        type: "carousel",
        startAt: 0,
        perView: perView,
        gap: 24,
        breakpoints: {
          1024: { perView: 2 },
          768: { perView: 1 }
        }
      });

      glide.mount();
      return () => glide.destroy();
    }
  }, [filteredCards, isLoading, perView]);

  if (error) return (
    <div role="alert" className="text-red-600 p-4">
      Error loading carousel content
    </div>
  );

  return (
    <div className="glide" ref={carouselRef}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={carouselVariants}
            className="flex gap-4 animate-pulse"
          >
            {Array.from({ length: perView }).map((_, i) => (
              <div 
                key={i}
                className="w-full bg-gray-100 rounded-lg p-4 h-[480px] flex flex-col"
                aria-hidden="true"
              >
                <div className="bg-gray-200 h-48 rounded-lg mb-4 flex-1" />
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded-full w-3/4" />
                  <div className="bg-gray-200 h-4 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={carouselVariants}
            initial="hidden"
            animate="visible"
            key="carousel-content"
          >
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides items-stretch">
                {filteredCards.map((card) => (
                  <li 
                    key={card.id}
                    className="glide__slide"
                  >
                    <Card
                      {...card}
                      aria-labelledby={`carousel-card-${card.id}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-2 justify-end mt-4" data-glide-el="controls">
              <button
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary_hover focus:ring-2 transition-colors duration-300"
                data-glide-dir="<"
                aria-label="Previous slide"
              >
                <NavArrowLeft aria-hidden="true" />
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary_hover focus:ring-2 transition-colors duration-300"
                data-glide-dir=">"
                aria-label="Next slide"
              >
                <NavArrowRight aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardCarousel;
