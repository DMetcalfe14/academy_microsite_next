"use client";

import useSWR from "swr";
import { useEffect, useRef, lazy } from "react";
import Glide from "@glidejs/glide";
const Banner = lazy(() => import("./banner"));
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import CarouselSkeleton from "./carousel_skeleton";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Carousel = () => {
  const glideRef = useRef(null);
  const sliderRef = useRef(null);
  const { data: slides = [], isLoading } = useSWR("slides.json", fetcher);

  useEffect(() => {
    if (!isLoading && slides?.length > 0 && sliderRef.current) {
      const glide = new Glide(sliderRef.current, {
        type: "carousel",
        perView: 1,
        focusAt: "center",
        keyboard: true,
        gap: 0,
        animationDuration: 500,
      });

      // Mount Glide
      glide.mount();
      glideRef.current = glide;

      // Add event listener for accessibility logic
      glide.on(["move.after", "run"], function () {
        document.querySelectorAll("#rotator li:not(.glide__slide--active) a").forEach((link) => {
          link.setAttribute("tabindex", -1);
        });
        document.querySelector("#rotator li.glide__slide--active a")?.setAttribute("tabindex", 0);
      });

      // Cleanup on unmount
      return () => {
        glide.destroy();
      };
    }
  }, [slides, isLoading]);

  const handleControlClick = (direction) => {
    if (glideRef.current) {
      glideRef.current.go(direction);
    }
  };

  const Arrow = ({ direction }) => (
    <button
      className={`absolute top-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-colors transform -translate-y-1/2 rounded-full w-12 h-12 flex items-center justify-center ${
        direction === "left" ? "left-4" : "right-4"
      }`}
      onClick={() => handleControlClick(direction === "left" ? "<" : ">")}
      aria-label={`${direction} arrow`}
    >
      {direction === "left" ? (
        <NavArrowLeft width={24} height={24} color="white" />
      ) : (
        <NavArrowRight width={24} height={24} color="white" />
      )}
    </button>
  );

  return isLoading ? (
    <CarouselSkeleton />
  ) : (
    <div id="rotator" className="relative glide" ref={sliderRef}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {slides.map((slide, index) => (
            <li key={index} className="glide__slide">
              <Banner heading={slide.heading} body={slide.body} image={slide.image} cta={slide.cta} alt={slide.alt} />
            </li>
          ))}
        </ul>
      </div>

      <Arrow direction="left" />
      <Arrow direction="right" />
    </div>
  );
};

export default Carousel;
