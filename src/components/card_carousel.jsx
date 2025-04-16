import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import Card from "./card";
import CardCarouselSkeleton from "./card_carousel_skeleton";
import Button from "@/components/button";

// Utility: Find all focusable elements in a container
const getFocusableElements = (container) => {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
};

const CardCarousel = ({ cards = [], perView = 3, onViewAll }) => {
  const carouselRef = useRef(null);
  const glideInstance = useRef(null);
  const observerRef = useRef(null);

  // Update tabIndex and aria-hidden for all slides
  const updateAccessibility = () => {
    const slides = Array.from(
      carouselRef.current?.querySelectorAll(".glide__slide") || []
    );

    slides.forEach((slide) => {
      const isVisible =
        slide.classList.contains("glide__slide--active") ||
        slide.classList.contains("glide__slide--visible");

      // Update slide attributes
      slide.tabIndex = -1;
      slide.setAttribute("aria-hidden", !isVisible);

      // Update all focusable children
      getFocusableElements(slide).forEach((el) => {
        el.tabIndex = isVisible ? 0 : -1;
        el.setAttribute("aria-hidden", !isVisible);
      });
    });
  };

  // Initialize Glide and observer
  useEffect(() => {
    if (carouselRef.current && cards.length > 0) {
      const glide = new Glide(carouselRef.current, {
        type: "carousel",
        startAt: 0,
        perView: perView,
        gap: 15,
        throttle: 100,
        keyboard: false,
        breakpoints: {
          1024: { perView: 2 },
          768: { perView: 1 },
        },
      });

      // Update accessibility on mount and slide changes
      glide.on(["mount.after", "run.after"], updateAccessibility);

      // Use MutationObserver to detect DOM changes
      observerRef.current = new MutationObserver(updateAccessibility);
      observerRef.current.observe(carouselRef.current, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class"],
      });

      glide.mount();
      glideInstance.current = glide;

      // Initial update
      setTimeout(updateAccessibility, 0);

      return () => {
        glide.destroy();
        observerRef.current?.disconnect();
      };
    }
  }, [cards, perView]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!carouselRef.current?.contains(document.activeElement)) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        glideInstance.current?.go(">");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        glideInstance.current?.go("<");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!cards?.length)
    return <CardCarouselSkeleton perView={perView} aria-label="Loading..." />;

  return (
    <div
      className="glide"
      ref={carouselRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Card carousel"
      tabIndex={-1}
    >
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides items-stretch">
          {cards.map((card) => (
            <li
              key={card.id}
              className="glide__slide h-auto"
              role="group"
              aria-roledescription="slide"
            >
              <Card {...card} className="h-full" />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 justify-between mt-4">
        {onViewAll && <Button href={onViewAll}>View All</Button>}
        <div className="flex gap-2" data-glide-el="controls">
          <button
            className="p-2 bg-primary text-label rounded-full"
            data-glide-dir="<"
            aria-label="Previous slide"
          >
            <NavArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            className="p-2 bg-primary text-label rounded-full"
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
