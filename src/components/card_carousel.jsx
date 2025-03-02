import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import Card from "./card";
import Link from "next/link";

const CardCarousel = ({ cards, category, ids, perView, onViewAll }) => {
    const carouselRef = useRef(null); // Create a ref for the carousel container

    // Filter cards based on category and IDs
    const filteredCards = cards.filter((card) => {
        const matchesCategory = category ? card.categories.includes(category) : true;
        const matchesId = ids ? ids.includes(card.id) : true;
        return matchesCategory && matchesId;
    });

    useEffect(() => {
        if (carouselRef.current) {
            const glide = new Glide(carouselRef.current, {
                type: "carousel",
                startAt: 0,
                perView: perView,
                gap: 15,
                throttle: true,
                breakpoints: {
                    1024: {
                        perView: 2,
                    },
                    600: {
                        perView: 1,
                    },
                },
            });

            glide.mount();

            return () => {
                glide.destroy();
            };
        }
    }, [filteredCards, perView]); // Re-run effect if filteredCards or perView changes

    return (
        <div className="glide" ref={carouselRef}>
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
            <div className="flex gap-2 justify-between mt-4">
              {onViewAll && (
                <Link
                  href={onViewAll}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary_hover focus:ring-2 font-semibold"
                >
                  View All
                </Link>
              )}
              <div className="flex gap-2" data-glide-el="controls">
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary_hover focus:ring-2"
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
                </div>
        </div>
    );
};

export default CardCarousel;