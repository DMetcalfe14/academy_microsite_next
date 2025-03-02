import { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';
import Banner from "@/components/banner";

const Carousel = ({ slides }) => {
  const glideRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const glide = new Glide(sliderRef.current, {
      type: 'slider',
      perView: 1,
      focusAt: 'center',
      keyboard: true,
      gap: 0,
      animationDuration: 500,
      rewind: false
    });

    glide.mount();
    glideRef.current = glide;

    return () => glide.destroy();
  }, []);

  const Arrow = ({ direction }) => (
    <button
      className={`glide__arrow glide__arrow--${direction} absolute top-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 transition-colors transform -translate-y-1/2 rounded-full w-12 h-12 flex items-center justify-center ${
        direction === 'left' ? 'left-4' : 'right-4'
      }`}
      data-glide-dir={direction === 'left' ? '<' : '>'}
      aria-label={`${direction} arrow`}
    >
      {direction === 'left' ? (
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
              <Banner
                heading={slide.heading}
                body={slide.body}
                image={slide.image}
              />
            </li>
          ))}
        </ul>
      </div>
      
      <div className="glide__arrows" data-glide-el="controls">
        <Arrow direction="left" />
        <Arrow direction="right" />
      </div>
    </div>
  );
};

export default Carousel;
