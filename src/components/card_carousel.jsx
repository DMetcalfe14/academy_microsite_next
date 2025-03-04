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
          // Example:
          // ...
        }
      });

      glide.mount();

      return () => glide.destroy();
    }
  }, [cards, perView]);

  if (!cards?.length) return <CardCarouselSkeleton perView={perView} />;

  return (
    <div className="glide" ref={carouselRef}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides items-stretch">
          {cards.map((card) => (
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

