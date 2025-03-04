import BannerSkeleton from "./banner_skeleton";

const CarouselSkeleton = () => (
  <div id="rotator" className="relative glide">
    <div className="glide__track" data-glide-el="track">
      <ul className="glide__slides">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="glide__slide">
            <BannerSkeleton />
          </li>
        ))}
      </ul>
    </div>

    {/* Placeholder arrows */}
    <button
      className="absolute top-1/2 left-4 z-10 p-2 bg-black/30 rounded-full w-12 h-12"
      aria-label="left arrow"
    ></button>
    <button
      className="absolute top-1/2 right-4 z-10 p-2 bg-black/30 rounded-full w-12 h-12"
      aria-label="right arrow"
    ></button>
  </div>
);

export default CarouselSkeleton;
