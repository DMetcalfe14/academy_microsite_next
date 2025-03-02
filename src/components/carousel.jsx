"use client";

import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import Glide from "@glidejs/glide";
import Banner from "@/components/banner";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import { useLoading } from "@/app/loadingContext";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Carousel = () => {
  const glideRef = useRef(null);
  const sliderRef = useRef(null);
  const { startLoading, stopLoading } = useLoading();
  const { data: slides = [], isLoading } = useSWR("/slides.json", fetcher);
  const [isGlideReady, setIsGlideReady] = useState(false);

  useEffect(() => {
    if (isLoading) {
      startLoading();
      return () => stopLoading();
    }
  }, [isLoading, startLoading, stopLoading]);

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

      startLoading(); // Start loading for Glide initialization
      glide.mount();
      glideRef.current = glide;
      setIsGlideReady(true);
      stopLoading(); // Stop loading after Glide is ready

      return () => {
        glide.destroy();
        setIsGlideReady(false);
        stopLoading(); // Cleanup loading state
      };
    }
  }, [isLoading, slides, startLoading, stopLoading]);

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

  return (
    <div className="relative glide" ref={sliderRef}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {slides.map((slide, index) => (
            <li key={index} className="glide__slide">
              <Banner heading={slide.heading} body={slide.body} image={slide.image} cta={slide.cta} />
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
