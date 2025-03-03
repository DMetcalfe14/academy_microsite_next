import { useEffect, useRef, useMemo } from "react";
import Glide from "@glidejs/glide";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import Card from "./card";
import Link from "next/link";

const CardCarousel = ({ 
  cards, 
  category, 
  ids, 
  perView = 3, 
  onViewAll,
  limit = Infinity 
}) => {
  const carouselRef = useRef(null);

  const displayedCards = useMemo(() => {
    const filtered = cards.filter((card) => {
      const matchesCategory = category ? card.categories.includes(category) : true;
      const matchesId = ids?.length ? ids.includes(card.id) : true;
      return matchesCategory || matchesId;
    });
    
    return filtered.slice(0, limit);
  }, [cards, category, ids, limit]);

  useEffect(() => {
    if (carouselRef.current && displayedCards.length > 0) {
      const glide = new Glide(carouselRef.current, {
        type: "carousel",
        startAt: 0,
        perView: perView,
        gap: 15,
        throttle: 100,
        breakpoints: {
          1280: { perView: Math.min(4, displayedCards.length) },
          1024: { perView: Math.min(3, displayedCards.length) },
          768: { perView: Math.min(2, displayedCards.length) },
          640: { perView: 1 }
        }
      });

      glide.mount();
      return () => glide.destroy();
    }
  }, [displayedCards, perView]);

  if (!displayedCards.length) return null;

  return (
    <div className="glide" ref={carouselRef}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides items-stretch">
          {displayedCards.map((card) => (
            <li key={card.id} className="glide__slide h-auto">
              <Card
                {...card}
                className="h-full"
                aria-labelledby={`carousel-card-${card.id}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 justify-between mt-4">
        {onViewAll && (
          <Link
            href={onViewAll}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary_hover focus:ring-2 font-semibold transition-colors"
          >
            View All
          </Link>
        )}
        
        <div className="flex gap-2" data-glide-el="controls">
          <button
            className="p-2 bg-primary text-white rounded-full hover:bg-primary_hover focus:ring-2 transition-colors"
            data-glide-dir="<"
            aria-label="Previous slide"
          >
            <NavArrowLeft className="w-5 h-5" />
          </button>
          <button
            className="p-2 bg-primary text-white rounded-full hover:bg-primary_hover focus:ring-2 transition-colors"
            data-glide-dir=">"
            aria-label="Next slide"
          >
            <NavArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;