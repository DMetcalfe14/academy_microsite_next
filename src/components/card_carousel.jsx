import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import Card from "./card";
import CardCarouselSkeleton from "./card_carousel_skeleton";

const CardCarousel = ({ 
  cards = [], 
  perView = 3 
}) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current && cards.length > 0) {
      const glide = new Glide(carouselRef.current, {
        type: "carousel",
        startAt: 0,
        perView: perView,
        gap: 15,
        throttle: 100,
        keyboard: true,
        breakpoints: {
          // Adjust breakpoints as needed
          1024: { perView: 2 },
          768: { perView: 1 },
        },
      });

      glide.mount();

      return () => glide.destroy();
    }
  }, [cards, perView]);

  if (!cards?.length) return <CardCarouselSkeleton perView={perView} aria-label="Loading carousel content" />;

  return (
    <div 
      className="glide" 
      ref={carouselRef} 
      role="region" 
      aria-roledescription="carousel" 
      aria-label="Card carousel"
    >
      {/* Track Section */}
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides items-stretch">
          {cards.map((card, index) => (
            <li
              key={card.id}
              className="glide__slide h-auto"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${cards.length}`}
            >
              <Card
                {...card}
                className="h-full"
                aria-labelledby={`carousel-card-${card.id}`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Controls */}
      <div className="flex gap-2 justify-between mt-4">
        <div className="flex gap-2" data-glide-el="controls">
          <button
            className="p-2 bg-primary text-white rounded-full hover:bg-primary_hover focus:ring-2 focus:ring-primary transition-colors"
            data-glide-dir="<"
            aria-label="Previous slide"
          >
            <NavArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            className="p-2 bg-primary text-white rounded-full hover:bg-primary_hover focus:ring-2 focus:ring-primary transition-colors"
            data-glide-dir=">"
            aria-label="Next slide"
          >
            <NavArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;