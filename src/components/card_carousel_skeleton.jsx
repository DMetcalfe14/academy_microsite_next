const CardCarouselSkeleton = ({ perView }) => {
    return (
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides items-stretch">
            {Array.from({ length: perView }).map((_, index) => (
              <li key={index} className="glide__slide h-auto">
                <div className="bg-gray-200 animate-pulse h-[300px] rounded-lg"></div>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="flex gap-2 justify-between mt-4">
          {/* Placeholder controls */}
          <button
            className="p-2 bg-gray-300 rounded-full animate-pulse w-10 h-10"
            aria-label="Previous slide"
          ></button>
          <button
            className="p-2 bg-gray-300 rounded-full animate-pulse w-10 h-10"
            aria-label="Next slide"
          ></button>
        </div>
      </div>
    );
  };
  
  export default CardCarouselSkeleton;
  