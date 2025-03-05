const CardCarouselSkeleton = ({ perView }) => {
  return (
    <div className="glide" aria-hidden="true">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides items-stretch">
          {Array.from({ length: perView }).map((_, index) => (
            <li key={index} className="glide__slide h-auto">
              <div 
                className="bg-gray-400 animate-pulse h-[300px] rounded-lg"
                role="presentation"
              ></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 justify-between mt-4">
        <button
          className="p-2 bg-gray-500 rounded-full animate-pulse w-10 h-10"
          aria-label="Previous slide"
          disabled
        ></button>
        <button
          className="p-2 bg-gray-500 rounded-full animate-pulse w-10 h-10"
          aria-label="Next slide"
          disabled
        ></button>
      </div>
    </div>
  );
};

export default CardCarouselSkeleton;