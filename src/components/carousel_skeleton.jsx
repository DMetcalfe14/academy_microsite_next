import BannerSkeleton from "./banner_skeleton";

const CarouselSkeleton = () => (
  <div 
    id="rotator" 
    className="relative glide"
    aria-hidden="true"
  >
    <div className="glide__track" data-glide-el="track">
      <ul className="glide__slides">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="glide__slide" role="presentation">
            <BannerSkeleton />
          </li>
        ))}
      </ul>
    </div>

    <button
      className="absolute top-1/2 left-4 z-10 p-2 bg-gray-500 rounded-full w-12 h-12 animate-pulse"
      aria-label="Previous slide placeholder"
      disabled
    ></button>
    <button
      className="absolute top-1/2 right-4 z-10 p-2 bg-gray-500 rounded-full w-12 h-12 animate-pulse"
      aria-label="Next slide placeholder"
      disabled
    ></button>
  </div>
);

export default CarouselSkeleton;